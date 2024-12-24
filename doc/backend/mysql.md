# Mysql

## 第一章：数据库概述

暂无

## 第二章：环境搭建

[点击这里下载 PDF]( /pdf/mysql.pdf )

[点击这里下载 sql文件]( /sql/atguigudb.sql )

**导入表**
```bash
source d:\xxx.sql
```

## 第三章：SELECT语句

### SQL语言的规则和规范

1. 基本规则

- SQL 可以写在一行或者多行。为了提高可读性，各子句分行写，必要时使用缩进
- 每条命令以 ; 或 \g 或 \G 结束
- 关键字不能被缩写也不能分行
- 关于标点符号
  - 必须保证所有的()、单引号、双引号是成对结束的 
  - 必须使用英文状态下的半角输入方式 
  - 字符串型和日期时间类型的数据可以使用单引号（' '）表示 
  - 列的别名，尽量使用双引号（" "），而且不建议省略as

---

2. SQL大小写规范（建议遵守）

- MySQL 在 Windows 环境下是大小写不敏感的 
- MySQL 在 Linux 环境下是大小写敏感的 
  - 数据库名、表名、表的别名、变量名是严格区分大小写的 
  - 关键字、函数名、列名(或字段名)、列的别名(字段的别名) 是忽略大小写的。 
- 推荐采用统一的书写规范： 
  - 数据库名、表名、表别名、字段名、字段别名等都小写 
  - SQL 关键字、函数名、绑定变量等都大写
  
---

3. 注释

```mysql
单行注释：#注释文字(MySQL特有的方式)
单行注释：-- 注释文字(--后面必须包含一个空格。)
多行注释：/* 注释文字 */
```
---

4. 命名规则

- 数据库、表名不得超过30个字符，变量名限制为29个 
- 必须只能包含 A–Z, a–z, 0–9, _共63个字符 
- 数据库名、表名、字段名等对象名中间不要包含空格 同一个MySQL软件中，数据库不能同名；同一个库中，表不能重名；
- 同一个表中，字段不能重名 必须保证你的字段没有和保留字、数据库系统或常用方法冲突。如果坚持使用，请在SQL语句中使 用`（着重号）引起来 
- 保持字段名和类型的一致性，在命名字段并为其指定数据类型的时候一定要保证一致性。假如数据 类型在一个表里是整数，那在另一个表里可就别变成字符型了

---

### 基本的SELECT语句

1. SELECT ... FROM ...

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

2. 列表的别名

- 方式一（空格）

```sql
SELECT first_name f_n
FROM employees;
```

- 方式二（AS关键字）

```sql
SELECT first_name AS f_n
FROM employees;
```

- 方式三（引号）

```sql
SELECT first_name "f_n"
FROM employees;
```

3. 去除重复行

**DISTINCT**

```sql
SELECT DISTINCT department_id
FROM departments;
```

4. 空值参与运算

**空值：null ( 不等同于0, ’ ‘, ’null‘ )**

**实际问题的解决方案：引入IFNULL**

```sql
SELECT employee_id, salary AS "月工资", 
(1 + IFNULL(commission_pct,0)) * salary * 12 AS "年工资"
FROM employees;
```

5. 着重号 ``

**必须保证你的字段没有和保留字、数据库系统或常见方法冲突。**

**如果坚持使用，在SQL语句中使用 `` 引起来。**

```sql
SELECT *
FROM `order`;
```

6. 查询常数

```sql
SELECT '某某某公司' AS "公司名", employee_id
FROM employees;
```

### 显示表结构

**显示表中字段的详细信息**

```sql
DESC employees;
# 或者
DESCRIBE employees;
```

| Field          | Type         | Null | Key | Default | Extra |
| :------------: | :----------: | :--: | :-: | :-----: | :---: |
| employee_id    | int(6)       | NO   | PRI | 0       |       |
| first_name     | varchar(20)  | YES  |     | NULL    |       |
| last_name      | varchar(25)  | NO   |     | NULL    |       |
| email          | varchar(25)  | NO   | UNI | NULL    |       |
| phone_number   | varchar(20)  | YES  |     | NULL    |       |
| hire_date      | date         | NO   |     | NULL    |       |
| job_id         | varchar(10)  | NO   | MUL | NULL    |       |
| salary         | double(8,2)  | YES  |     | NULL    |       |
| commission_pct | double(2,2)  | YES  |     | NULL    |       |
| manager_id     | int(6)       | YES  | MUL | NULL    |       |
| department_id  | int(4)       | YES  | MUL | NULL    |       |

**其中，各个字段的含义分别解释如下：** 

- Field：表示字段名称。 
- Type：表示字段类型，这里 barcode、goodsname 是文本型的，price 是整数类型的。 
- Null：表示该列是否可以存储NULL值。 
- Key：表示该列是否已编制索引。
- PRI表示该列是表主键的一部分；
- UNI表示该列是UNIQUE索引的一 部分；
- MUL表示在列中某个给定值允许出现多次。 
- Default：表示该列是否有默认值，如果有，那么值是多少。 
- Extra：表示可以获取的与给定列有关的附加信息，例如AUTO_INCREMENT等。

### 过滤数据


[笔记来源：https://github.com/codinglin/StudyNotes](https://github.com/codinglin/StudyNotes)
