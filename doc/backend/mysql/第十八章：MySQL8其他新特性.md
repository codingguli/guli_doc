## 第十八章：MySQL8 其他新特性

### MySQL8 新特性概述

### 新特性一：窗口函数

#### 语法

```sql
# 写法一
函数 OVER（[PARTITION BY 字段名 ORDER BY 字段名 ASC|DESC]）
# 写法二
函数 OVER 窗口名 … WINDOW 窗口名 AS （[PARTITION BY 字段名 ORDER BY 字段名 ASC|DESC]）
```

- OVER 关键字指定函数窗口的范围。
  > - 如果省略后面括号中的内容，则窗口会包含满足 WHERE 条件的所有记录，窗口函数会基于所有满足 WHERE 条件的记录进行计算。
  > - 如果 OVER 关键字后面的括号不为空，则可以使用如下语法设置窗口。
- 窗口名：为窗口设置一个别名，用来标识窗口。
- PARTITION BY 子句：指定窗口函数按照哪些字段进行分组。分组后，窗口函数可以在每个分组中分别执行。
- ORDER BY 子句：指定窗口函数按照哪些字段进行排序。执行排序操作使窗口函数按照排序后的数据记录的顺序进行编号。
- FRAME 子句：为分区中的某个子集定义规则，可以用来作为滑动窗口使用。

#### 函数分类

<img src="/img/mysql/image-20220613210116486.png" />

#### 示例

```sql
# 常规写法
CREATE TABLE sales(
id INT PRIMARY KEY AUTO_INCREMENT,
city VARCHAR(15),
county VARCHAR(15),
sales_value DECIMAL
);
INSERT INTO sales(city,county,sales_value)
VALUES
('北京','海淀',10.00),
('北京','朝阳',20.00),
('上海','黄埔',30.00),
('上海','长宁',10.00);

CREATE TEMPORARY TABLE  total_t
SELECT SUM(sales_value) total
FROM sales;

CREATE TEMPORARY TABLE city_total_t
SELECT city, SUM(sales_value) city_total
FROM sales
GROUP BY city;

SELECT s.city '城市', s.county '地区', s.sales_value '个人销售量',
c.city_total '城市销售总量', t.total '全国销售总量',
CONCAT(FLOOR(s.sales_value / c.city_total * 100), '%') '城市销售占比',
CONCAT(FLOOR(s.sales_value / t.total * 100), '%') '全国销售占比'
FROM sales s
JOIN city_total_t c ON s.city = c.city
JOIN total_t t;

# 窗口函数（写法一）
SELECT city "城市", county "地区", sales_value "个人销售量",
SUM(sales_value) OVER (PARTITION BY city) "城市总销售",
SUM(sales_value) OVER () "全国总销售",
CONCAT(FLOOR(sales_value / SUM(sales_value) OVER (PARTITION BY city) * 100), '%') "城市销售占比",
CONCAT(FLOOR(sales_value / SUM(sales_value) OVER () * 100), '%') "全国销售占比"
FROM sales;

# 窗口函数（写法二）
SELECT city "城市", county "地区", sales_value "个人销售量",
SUM(sales_value) OVER w "城市总销量",
SUM(sales_value) OVER () "全国总销量",
CONCAT(FLOOR(sales_value / SUM(sales_value) OVER w * 100), '%') "城市销量占比",
CONCAT(FLOOR(sales_value / SUM(sales_value) OVER() * 100), '%') "全国销量占比"
FROM sales
WINDOW w AS (PARTITION BY city)
```

#### 分类讲解

- 前置条件

:::info 前置条件

- 创建表

```sql
CREATE TABLE goods(
id INT PRIMARY KEY AUTO_INCREMENT,
category_id INT,
category VARCHAR(15),
NAME VARCHAR(30),
price DECIMAL(10,2),
stock INT,
upper_time DATETIME
);
```

- 插入数据

```sql
INSERT INTO goods(category_id,category,NAME,price,stock,upper_time)
VALUES
(1, '女装/女士精品', 'T恤', 39.90, 1000, '2020-11-10 00:00:00'),
(1, '女装/女士精品', '连衣裙', 79.90, 2500, '2020-11-10 00:00:00'),
(1, '女装/女士精品', '卫衣', 89.90, 1500, '2020-11-10 00:00:00'),
(1, '女装/女士精品', '牛仔裤', 89.90, 3500, '2020-11-10 00:00:00'),
(1, '女装/女士精品', '百褶裙', 29.90, 500, '2020-11-10 00:00:00'),
(1, '女装/女士精品', '呢绒外套', 399.90, 1200, '2020-11-10 00:00:00'),
(2, '户外运动', '自行车', 399.90, 1000, '2020-11-10 00:00:00'),
(2, '户外运动', '山地自行车', 1399.90, 2500, '2020-11-10 00:00:00'),
(2, '户外运动', '登山杖', 59.90, 1500, '2020-11-10 00:00:00'),
(2, '户外运动', '骑行装备', 399.90, 3500, '2020-11-10 00:00:00'),
(2, '户外运动', '运动外套', 799.90, 500, '2020-11-10 00:00:00'),
(2, '户外运动', '滑板', 499.90, 1200, '2020-11-10 00:00:00');
```

:::

- 序号函数

:::info 序号函数

- ROW_NUMBER()函数

  > ROW_NUMBER()函数能够对数据中的序号进行顺序显示。

- 查询 goods 数据表中每个商品分类下价格降序排列的各个商品信息

```sql
SELECT ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY price) 'row_num',
id, category_id, category, price, stock, upper_time
FROM goods;

SELECT ROW_NUMBER() OVER w 'row_num',
id, category_id, category, price, stock, upper_time
FROM goods
WINDOW w AS (PARTITION BY category_id ORDER BY price ASC);
```

- 查询 goods 数据表中每个商品分类下价格最高的 3 种商品信息。

```sql
SELECT *
FROM (
      SELECT ROW_NUMBER() OVER w 'row_num',
      id, category_id, category, price, stock, upper_time
      FROM goods
      WINDOW w AS (PARTITION BY category_id ORDER BY price ASC)
) t
WHERE row_num <= 3;
```

- RANK()函数

> 使用 RANK()函数能够对序号进行并列排序，并且会跳过重复的序号，比如序号为 1、1、3。

- 使用 RANK()函数获取 goods 数据表中各类别的价格从高到低排序的各商品信息。

```sql
SELECT RANK() OVER w "序号",
id, category_id, category, price, stock, upper_time
FROM goods
WINDOW w AS (PARTITION BY category_id ORDER BY price);
```

- DENSE_RANK()函数

> DENSE_RANK()函数对序号进行并列排序，并且不会跳过重复的序号，比如序号为 1、1、2。 举例：使用 DENSE_RANK()函数获取 goods 数据表中各类别的价格从高到低排序的各商品信息。

- 使用 DENSE_RANK()函数获取 goods 数据表中各类别的价格从高到低排序的各商品信息。

```sql
SELECT DENSE_RANK() OVER w "序号",
id, category_id, category, price, stock, upper_time
FROM goods
WINDOW w AS (PARTITION BY category_id ORDER BY price);
```

:::

- 分布函数

:::info 分布函数

- PERCENT_RANK()函数

  > PERCENT_RANK()函数是等级值百分比函数。按照如下方式进行计算。

```sql
(rank - 1) / (rows - 1)
```

- 计算 goods 数据表中名称为“女装/女士精品”的类别下的商品的 PERCENT_RANK 值。

```sql
SELECT
RANK() OVER w "序号",
PERCENT_RANK() OVER w "分布值",
id, category_id, category, price, stock, upper_time
FROM goods
WINDOW w AS (PARTITION BY category_id ORDER BY price);
```

- CUME_DIST()函数

  > CUME_DIST()函数主要用于查询小于或等于某个值的比例。

- 查询 goods 数据表中小于或等于当前价格的比例。

```sql
SELECT CUME_DIST() OVER w "小于或等于当前价格的比例",
id, category_id, category, `name`, price, stock, upper_time
FROM goods
WINDOW w AS (PARTITION BY category_id ORDER BY price DESC);
```

:::

- 前后函数

:::info 前后函数

- LAG(expr,n)函数

  > LAG(expr,n)函数返回当前行的前 n 行的 expr 的值。

- 查询 goods 数据表中前一个商品价格与当前商品价格的差值。

```sql
SELECT LAG(price, 1) OVER w "与前一个的差值",
id, category_id, category, `name`, price, stock, upper_time
FROM goods
WINDOW w AS (PARTITION BY category_id ORDER BY price);
```

- LEAD(expr,n)函数

  > LEAD(expr,n)函数返回当前行的后 n 行的 expr 的值。

- 查询 goods 数据表中后一个商品价格与当前商品价格的差值。

```sql
SELECT LEAD(price, 1) OVER w "与后一个值比较",
id, category_id, category, `name`, price, stock, upper_time
FROM goods
WINDOW w AS (PARTITION BY category_id ORDER BY price);
```

:::

- 首尾函数

:::info 首尾函数

- FIRST_VALUE(expr)函数

  > IRST_VALUE(expr)函数返回第一个 expr 的值。

- 按照价格排序，查询第 1 个商品的价格信息。

```sql
SELECT FIRST_VALUE(price) OVER w "第一个商品",
id, category_id, category, `name`, price, stock, upper_time
FROM goods
WINDOW w AS (PARTITION BY category_id ORDER BY price);
```

- LAST_VALUE(expr)函数

  > LAST_VALUE(expr)函数返回最后一个 expr 的值。

- 按照价格排序，查询最后一个商品的价格信息。

```sql
SELECT LAST_VALUE(price) OVER w "最后一个商品",
id, category_id, category, `name`, price, stock, upper_time
FROM goods
WINDOW w AS (PARTITION BY category_id ORDER BY price);
```

:::

- 其他函数

:::info 其他函数

- NTH_VALUE(expr,n)函数

  > NTH_VALUE(expr,n)函数返回第 n 个 expr 的值。

- 查询 goods 数据表中排名第 2 和第 3 的价格信息。

```sql
SELECT NTH_VALUE(price, 2) OVER w '第二个产品价格',
NTH_VALUE(price, 3) OVER w "第三个产品价格",
id, category_id, category, `name`, price, stock, upper_time
FROM goods
WINDOW w AS (PARTITION BY category_id ORDER BY price);
```

- NTILE(n)函数

  > NTILE(n)函数将分区中的有序数据分为 n 个桶，记录桶编号。

- 将 goods 表中的商品按照价格分为 3 组。

```sql
SELECT NTILE(3) OVER w "分组",
id, category_id, category, `name`, price, stock, upper_time
FROM goods
WINDOW w AS (PARTITION BY category_id ORDER BY price);
```

:::

#### 小结

> 窗口函数的特点是可以分组，而且可以在分组内排序。另外，窗口函数不会因为分组而减少原表中的行 数，这对我们在原表数据的基础上进行统计和排序非常有用。

### 新特性二：公用表表达式
