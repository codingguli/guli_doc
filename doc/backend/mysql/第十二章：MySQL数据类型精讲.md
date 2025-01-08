## 第十二章：MySQL数据类型精讲

### 数据类型概览

#### 全部数据类型

| 类型             | 举例                                                         |
| ---------------- | ------------------------------------------------------------ |
| 整数类型         | TINYINT、SMALLINT、MEDIUMINT、INT(或INTEGER)、BIGINT         |
| 浮点类型         | FLOAT、DOUBLE                                                |
| 定点数类型       | DECIMAL                                                      |
| 位类型           | BIT                                                          |
| 日期时间类型     | YEAR、TIME、DATE、DATETIME、TIMESTAMP                        |
| 文本字符串类型   | CHAR、VARCHAR、TINYTEXT、TEXT、MEDIUMTEXT、LONGTEXT          |
| 枚举类型         | ENUM                                                         |
| 集合类型         | SET                                                          |
| 二进制字符串类型 | BINARY、VARBINARY、TINYBLOB、BLOB、MEDIUMBLOB、LONGBLOB      |
| JSON类型         | JSON对象、JSON数组                                           |
| 空间数据类型     | 单值类型：GEOMETRY、POINT、LINESTRING、POLYGON； 集合类型：MULTIPOINT、MULTILINESTRING、MULTIPOLYGON、 GEOMETRYCOLLECTION |

#### 常见数据类型属性

| MySQL关键字        | 含义                                                 |
| ------------------ | ---------------------------------------------------- |
| NULL               | TINYINT、SMALLINT、MEDIUMINT、INT(或INTEGER)、BIGINT |
| NOT NULL           | FLOAT、DOUBLE                                        |
| DEFAULT            | DECIMAL                                              |
| PRIMARY KEY        | BIT                                                  |
| AUTO_INCREMENT     | YEAR、TIME、DATE、DATETIME、TIMESTAMP                |
| UNSIGNED           | CHAR、VARCHAR、TINYTEXT、TEXT、MEDIUMTEXT、LONGTEXT  |
| CHARACTER SET name | ENUM                                                 |

### 整数类型

#### 类型介绍

| 整数类型     | 字节 | 有符号数取值范围                         | 无符号数取值范围       |
| ------------ | ---- | ---------------------------------------- | ---------------------- |
| TINYINT      | 1    | -128~127                                 | 0~255                  |
| SMALLINT     | 2    | -32768~32767                             | 0~65535                |
| MEDIUMINT    | 3    | -8388608~8388607                         | 0~16777215             |
| INT、INTEGER | 4    | -2147483648~2147483647                   | 0~4294967295           |
| BIGINT       | 8    | -9223372036854775808~9223372036854775807 | 0~18446744073709551615 |

#### 可选属性

- M：表示显示宽度
  > - INT(5)，配合ZEROFILL使用，插入数长度小于5，用0填充
  > - 插入数长度大于显示宽度，不会有影响

- UNSIGNED：无符号类型（非负）

- ZEROFILL： 0填充

```sql
CREATE TABLE table1(
id INT(5) UNSIGNED ZEROFILL
)
```

#### 适用场景

- TINYINT ：一般用于枚举数据，比如系统设定取值范围很小且固定的场景。
- SMALLINT ：可以用于较小范围的统计数据，比如统计工厂的固定资产库存数量等。
- MEDIUMINT ：用于较大整数的计算，比如车站每日的客流量等。
- INT、INTEGER ：取值范围足够大，一般情况下不用考虑超限问题，用得最多。比如商品编号。
- BIGINT ：只有当你处理特别巨大的整数时才会用到。比如双十一的交易量、大型门户网站点击量、证 券公司衍生产品持仓等。

### 浮点类型

#### 类型介绍

| 浮点类型 | 介绍 |
| ------- | --- |
| FLOAT | 表示单精度浮点数 |
| DOUBLE | 表示双精度浮点数 |
| REAL | 默认DOUBLE，`SET sql_mode = “REAL_AS_FLOAT”` 默认FLOAT |

> 无符号相当于有符号的一半

#### 数据精度说明

```sql
CREATE TABLE table1(
a FLOAT(5, 2), # 超过小数位截取
b DOUBLE(5, 3) # 超出小数位四舍五入
)
```

#### 精度误差说明

```sql
CREATE TABLE table1(
f1 DOUBLE
);

INSERT INTO table1
VALUES(0.47),(0.44),(0.19);

SELECT SUM(f1)
FROM table1;
# 1.0999999999999999
```

### 定点数类型

| 类型 | 字节 | 有符号数取值范围 |
| --- | --- | ------------- |
| DECIMAL(M,D),DEC,NUMERIC | M+2字节 | 有效范围由M和D决定 |
> 0<=M<=65， 0<=D<=30，默认DECIMAL(10, 0)

```sql
CREATE TABLE test1(
a DECIMAL
b DECIMAL(5, 2)
);

INSERT INTO test1
VALUES(100.88, 999.99); # 超过小数位四舍五入
```

### 位类型：BIT

| 二进制字符串类型 | 长度 |	长度范围 | 占用空间 |
| ------------- | --- | ------- | ------- |
| BIT(M) | M	| 1 <= M <= 64 | 约为(M + 7)/8个字节 |

> BIT类型，如果没有指定(M)，默认是1位。这个1位，表示只能存1位的二进制值。这里(M)是表示二进制的 位数，位数最小值为1，最大值为64。

### 日期与时间类型

| 类型      | 名称     | 字节 | 日期格式            | 最小值                  | 最大值                 |
| --------- | -------- | ---- | ------------------- | ----------------------- | ---------------------- |
| YEAR      | 年       | 1    | YYYY或YY            | 1901                    | 2155                   |
| TIME      | 时间     | 3    | HH:MM:SS            | -838:59:59              | 838:59:59              |
| DATE      | 日期     | 3    | YYYY-MM-DD          | 1000-01-01              | 9999-12-03             |
| DATETIME  | 日期时间 | 8    | YYYY-MM-DD HH:MM:SS | 1000-01-01 00:00:00     | 9999-12-31 23:59:59    |
| TIMESTAMP | 日期时间 | 4    | YYYY-MM-DD HH:MM:SS | 1970-01-01 00:00:00 UTC | 2038-01-19 03:14:07UTC |

- YEAR 类型通常用来表示年
- DATE 类型通常用来表示年、月、日
- TIME 类型通常用来表示时、分、秒
- DATETIME 类型通常用来表示年、月、日、时、分、秒
- TIMESTAMP 类型通常用来表示带时区的年、月、日、时、分、秒

### 文本字符串类型

> 文本字符串总体上分为 CHAR 、 VARCHAR 、 TINYTEXT 、 TEXT 、 MEDIUMTEXT 、 LONGTEXT 、 ENUM 、 SET 等类型

### ENUM类型

| 文本字符串类型 | 长度 |	长度范围 | 占用的存储空间 |
| ------------ | --- | ------ | ------------ |
| ENUM | L | 1 <= L <= 65535 | 1或2个字节 |

> 多选一

### SET类型

| 成员个数范围（L表示实际成员个数） | 占用的存储空间 |
| --------------------------- | ----------- |
| 1 <= L <= 8 | 1个字节 |
| 9 <= L <= 16 | 2个字节 |
| 17 <= L <= 24 | 3个字节 |
| 25 <= L <= 32 | 4个字节 |
| 33 <= L <= 64 | 8个字节 |

> 多选多