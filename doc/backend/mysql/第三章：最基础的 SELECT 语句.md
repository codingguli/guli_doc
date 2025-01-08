## 第三章：最基础的 SELECT 语句

### 基本的 SELECT 语句

#### SELECT...FROM...

- 语法

```sql
SELECT 列名
FROM 表名;
```

- 选择全部列

```sql
SELECT *
FROM employees;
```

- 选择特定的列

```sql
SELECT first_name, last_name, employee_id
FROM employees;
```

#### 列的别名

- 方式一（空格）

```sql
SELECT first_name f_n
FROM employees;
```

- 方式二（AS 关键字）

```sql
SELECT first_name AS f_n
FROM employees;
```

- 方式三（引号）

```sql
SELECT first_name "f_n"
FROM employees;
```

#### 去除重复行

**DISTINCT**

```sql
SELECT DISTINCT department_id
FROM departments;
```

#### 空值参与运算

> 空值：null ( 不等同于 0, ’ ‘, ’null‘ )

```sql
SELECT employee_id, salary AS "月工资",
(1 + IFNULL(commission_pct,0)) * salary * 12 AS "年工资"
FROM employees;
```

#### 着重号 ``

> 必须保证你的字段没有和保留字、数据库系统或常见方法冲突。如果坚持使用，在 SQL 语句中使用 `` 引起来。

```sql
SELECT *

FROM `order`;
```

#### 查询常数

```sql
SELECT '某某某公司' AS "公司名", employee_id
FROM employees;
```

### 显示表结构

```sql
DESC employees;
# 或者
DESCRIBE employees;
```

|     Field      |    Type     | Null | Key | Default | Extra |
| :------------: | :---------: | :--: | :-: | :-----: | :---: |
|  employee_id   |   int(6)    |  NO  | PRI |    0    |       |
|   first_name   | varchar(20) | YES  |     |  NULL   |       |
|   last_name    | varchar(25) |  NO  |     |  NULL   |       |
|     email      | varchar(25) |  NO  | UNI |  NULL   |       |
|  phone_number  | varchar(20) | YES  |     |  NULL   |       |
|   hire_date    |    date     |  NO  |     |  NULL   |       |
|     job_id     | varchar(10) |  NO  | MUL |  NULL   |       |
|     salary     | double(8,2) | YES  |     |  NULL   |       |
| commission_pct | double(2,2) | YES  |     |  NULL   |       |
|   manager_id   |   int(6)    | YES  | MUL |  NULL   |       |
| department_id  |   int(4)    | YES  | MUL |  NULL   |       |

- Field：表示字段名称。
- Type：表示字段类型，这里 barcode、goodsname 是文本型的，price 是整数类型的。
- Null：表示该列是否可以存储 NULL 值。
- Key：表示该列是否已编制索引。
- PRI 表示该列是表主键的一部分；
- UNI 表示该列是 UNIQUE 索引的一 部分；
- MUL 表示在列中某个给定值允许出现多次。
- Default：表示该列是否有默认值，如果有，那么值是多少。
- Extra：表示可以获取的与给定列有关的附加信息，例如 AUTO_INCREMENT 等。

### 过滤数据

- 语法

```sql
SELECT 列1, 列2, 列3
FROM 表名
WHERE 过滤条件
```

> 使用 WHERE 子句，将不满足条件的行过滤掉。WHERE 子句紧随 FROM 子句。

- 举例

```sql
SELECT first_name, employee_id, job_id
FROM employees
WHERE department_id = 90;
```

### 练习

```sql
#第03章_基本的SELECT语句的课后练习

# 1.查询员工12个月的工资总和，并起别名为ANNUAL SALARY
SELECT (1 + IFNULL(commission_pct, 0)) * salary * 12 AS "ANNUAL SALARY"
FROM employees;

# 2.查询employees表中去除重复的job_id以后的数据
SELECT DISTINCT job_id
FROM employees;

# 3.查询工资大于12000的员工姓名和工资
SELECT first_name, salary
FROM employees
WHERE salary > 12000;

# 4.查询员工号为176的员工的姓名和部门号
SELECT first_name, department_id
FROM employees
WHERE employee_id = 176;

# 5.显示表 departments 的结构，并查询其中的全部数据
DESC departments;

SELECT *
FROM departments;
```
