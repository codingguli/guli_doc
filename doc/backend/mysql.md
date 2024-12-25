# Mysql

## 第一章：数据库概述

暂无

## 第二章：环境搭建

[点击这里下载 PDF]( /pdf/mysql/mysql.pdf )

<!-- [点击这里下载 sql文件]( /pdf/atguigudb.sql ) -->

**导入表**
```bash
source d:\xxx.sql
```

## 第三章：最基础的SELECT语句

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

- 语法

```sql
SELECT 列1, 列2, 列3
FROM 表名
WHERE 过滤条件
```

**使用WHERE 子句，将不满足条件的行过滤掉。WHERE子句紧随 FROM子句。**

- 举例

```sql
SELECT first_name, employee_id, job_id
FROM employees
WHERE department_id = 90;
```

## 第四章：运算符

**DUAL伪表**

### 算数运算符

- +：加法
- -：减法
- *：乘法
- /（DIV）：除法
- %（MOD）：取模

```sql
SELECT 100 + 0, 100 - 35.5, 100 * 2, 100 / 2, 100 DIV 2, 
100 % 3, 100 MOD 3
FROM DUAL;
```

>- 一个整数类型的值对整数进行加法和减法操作，结果还是一个整数；
>- 一个整数类型的值对浮点数进行加法和减法操作，结果是一个浮点数；
>- 在数学运算中，0不能用作除数，在MySQL中，一个数除以0为NULL。

---

### 比较运算符

- =：等于
- <=>：安全等于
- <>（!=）：不等于
- \>：大于
- \>=：大于等于
- <：小于
- <=：小于等于

1. 等号运算

**比较运算符用来对表达式左边的操作数和右边的操作数进行比较，比较的结果为真则返回1，比较的结果 为假则返回0，其他情况则返回NULL。** 

**如果等号两边的值、字符串或表达式中有一个为NULL，则比较结果为NULL**

```sql
SELECT 1 = 1, 1 = '1', 1 = 0, 'a' = 'a', 
(5 + 3) = (2 + 6), '' = NULL , NULL = NULL
FROM DUAL;
```

```sql
SELECT 1 = 2, 0 = 'abc', 1 = 'abc' 
FROM DUAL;
```

> - 如果等号两边的值、字符串或表达式都为字符串，则MySQL会按照字符串进行比较，其比较的 是每个字符串中字符的ANSI编码是否相等。 
> - 如果等号两边的值都是整数，则MySQL会按照整数来比较两个值的大小。 
> - 如果等号两边的值一个是整数，另一个是字符串，则MySQL会将字符串转化为数字进行比较。 
> - 如果等号两边的值、字符串或表达式中有一个为NULL，则比较结果为NULL。

---

2. 不等号运算

**不等于运算符（<>和!=）用于判断两边的数字、字符串或者表达式的值是否不相等， 如果不相等则返回1，相等则返回0。不等于运算符不能判断NULL值。如果两边的值有任意一个为NULL， 或两边都为NULL，则结果为NULL。 SQL语句示例如下：**

```sql
SELECT 1 <> 1, 1 != 2, 'a' != 'b', (3+4) <> (2+6), 'a' != NULL, NULL <> NULL
FROM DUAL;
```

**此外，还有非符号类型的运算符：**

<img src="/img/mysql/image-20220531154338298.png" alt="image-20220531154418141" />

---

3. 空运算符

**空运算符 (IS NULL 或者 ISNULL) 判断一个值是否为NULL，如果为NULL则返回1，否则返回0。**

```sql
SELECT NULL IS NULL, ISNULL(NULL), ISNULL('a'), 1 IS NULL
FROM DUAL;
```

---

4. 非空运算符

**非空运算符（IS NOT NULL）判断一个值是否不为NULL，如果不为NULL则返回1，否则返回0。**

```sql
SELECT 'a' IS NOT NULL, NULL IS NOT NULL
FROM DUAL;
```

---

5. 最小值运算符

**语法格式为：LEAST(值1，值2，...，值n)。其中，“值n”表示参数列表中有n个值。在有 两个或多个参数的情况下，返回最小值。**

```sql
SELECT LEAST (1,0,2), LEAST('b','a','c'), LEAST(1,NULL,2)
FROM DUAL;
```

---

6. 最大值运算符

**语法格式为：GREATEST(值1，值2，...，值n)。其中，n表示参数列表中有n个值。当有 两个或多个参数时，返回值为最大值。假如任意一个自变量为NULL，则GREATEST()的返回值为NULL。**

```sql
SELECT GREATEST(1,0,2), GREATEST('b','a','c'), GREATEST(1,NULL,2)
FROM DUAL;
```

7. BETWEEN AND运算符

**BETWEEN运算符使用的格式通常为SELECT D FROM TABLE WHERE C BETWEEN A AND B，此时，当C大于或等于A，并且C小于或等于B时，结果为1，否则结果为0。**

```sql
# 查询每月薪水在8000~10000之间的员工姓名和id
SELECT salary, employee_id
FROM employees
WHERE salary BETWEEN 8000 AND 10000;

# 查询每月薪水不在8000~10000之间的员工姓名和id
SELECT salary, employee_id
FROM employees
WHERE salary NOT BETWEEN 8000 AND 10000;
```

---

8. IN运算符

**IN运算符用于判断给定的值是否是IN列表中的一个值，如果是则返回1，否则返回0。如果给 定的值为NULL，或者IN列表中存在NULL，则结果为NULL。**

```sql
# 查询在50号、90号部门的员工姓名和id
SELECT last_name, employee_id
FROM employees
WHERE department_id IN (50, 90);

# 查询不在50号、90号部门的员工姓名和id
SELECT last_name, employee_id
FROM employees
WHERE department_id NOT IN (50, 90);
```

---

9. LIKE运算符

- %：匹配0个或多个字符
- _：匹配一个字符

**LIKE运算符主要用来匹配字符串，通常用于模糊匹配，如果满足条件则返回1，否则返回 0。如果给定的值或者匹配条件为NULL，则返回结果为NULL。**

```sql
# 查询姓名中带有字母'A'的员工姓名和薪水
SELECT last_name, salary
FROM employees
WHERE last_name LIKE '%A%';

# 查询查询姓名中第二个字母'a'的员工姓名和薪水
SELECT last_name, salary
FROM employees
WHERE last_name LIKE '_a%';
```

10. REGEXP运算符

**REGEXP运算符用来匹配字符串，语法格式为： RLIKE、REGEXP 匹配条件 。**

[正则表达式](https://goregex.cn/)

```sql
# 查询查询姓名以字母'e'结尾的员工姓名和薪水
SELECT last_name, salary
FROM employees
WHERE last_name REGEXP 'e$';
```

---

11. ESCAPE（了解即可）

**回避特殊符号的：使用转义符。例如：将[%]转为[$%]、[]转为[$]，然后再加上[ESCAPE‘$’]即可。**

```sql
SELECT job_id
FROM jobs
WHERE job_id LIKE 'IT\_%';
```

**如果使用\表示转义，要省略ESCAPE。如果不是\，则要加上ESCAPE。**

```sql
SELECT job_id
FROM jobs
WHERE job_id LIKE 'IT$_%' escape '$';
```

### 逻辑运算符

**逻辑运算符主要用来判断表达式的真假，在MySQL中，逻辑运算符的返回结果为1、0或者NULL。**

**MySQL中支持4种逻辑运算符如下：**

<img src="/img/mysql/image-20220531195405333.png" />

### 位运算符

**位运算符是在二进制数上进行计算的运算符。位运算符会先将操作数变成二进制数，然后进行位运算， 最后将计算结果从二进制变回十进制数。**

**MySQL支持的位运算符如下：**

<img src="/img/mysql/image-20220531195442995.png" />

### 运算符优先级

**数字编号越大，优先级越高，优先级高的运算符先进行计算。**

<img src="/img/mysql/image-20220531195522668.png" />

### 拓展：使用正则表达式查询

**了解**

<img src="/img/mysql/image-20220531204253508.png" />

## 第五章：排序和分页

### 排序

- 使用 ORDER BY 子句排序
  - ASC（ascend）: 升序
  - DESC（descend）:降序
- ORDER BY 子句在SELECT语句的结尾。

1. 单列排序

```sql
SELECT last_name, employee_id, department_id, salary
FROM employees
ORDER BY department_id DESC;
```

2. 多列排序

```sql
SELECT last_name, employee_id, department_id, salary
FROM employees
ORDER BY department_id DESC
```

> - 可以使用不在SELECT列表中的列排序。
> - 在对多列进行排序的时候，首先排序的第一列必须有相同的列值，才会对第二列进行排序。如果第 一列数据中所有值都是唯一的，将不再对第二列进行排序。

---

### 分页

- 格式

```sql
SELECT *
FROM employees
LIMIT [位置偏移量,] 行数
```

- 举例

```sql
# 前10条记录：
SELECT * FROM 表名 LIMIT 0,10;
# 或者
SELECT * FROM 表名 LIMIT 10;
# 第11至20条记录：
SELECT * FROM 表名 LIMIT 10,10;
# 第21至30条记录：
SELECT * FROM 表名 LIMIT 20,10;
```

> - MySQL 8.0中可以使用“LIMIT 3 OFFSET 4”，意思是获取从第5条记录开始后面的3条记录，和“LIMIT 4,3;”返回的结果相同。

- 分页显式公式：（当前页数-1）* 每页条数，每页条数

```sql
SELECT * FROM table
LIMIT(PageNo - 1) * PageSize, PageSize;
```

- 注意：LIMIT 子句必须放在整个SELECT语句的最后！

- 使用LIMIT的好处

**约束返回结果的数量可以 减少数据表的网络传输量 ，也可以 提升查询效率 。如果我们知道返回结果只有 1 条，就可以使用 LIMIT 1 ，告诉 SELECT 语句只需要返回一条记录即可。这样的好处就是 SELECT 不需 要扫描完整的表，只需要检索到一条符合条件的记录即可返回。**

## 第六章：多表查询

### 多表查询分类讲解

1. 自连接

```sql
# 查询employees表，返回 <员工 works for 老板>
SELECT CONCAT(e1.last_name, ' works for ', e2.last_name) '工作描述'
FROM employees e1, employees e2
WHERE e1.manager_id = e2.employee_id;
```

---

2. 内连接与外连接

- 内连接: 合并具有同一列的两个以上的表的行, 结果集中不包含一个表与另一个表不匹配的行

**sql92语法**

```sql
# 查询员工所在的部门信息（没有部门的不显示）
SELECT e.employee_id, e.last_name, d.department_id, d.department_name
FROM employees e, departments d
WHERE e.department_id = d.department_id;
```

---

**sql99语法**

```sql
# 查询员工所在的部门信息（没有部门的不显示）
SELECT e.employee_id, e.last_name, d.department_id, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id;
```

- 外连接: 两个表在连接过程中除了返回满足连接条件的行以外还返回左（或右）表中不满足条件的 行 ，这种连接称为左（或右） 外连接。没有匹配的行时, 结果表中相应的列为空(NULL)。
- 如果是左外连接，则连接条件中左边的表也称为 主表 ，右边的表称为 从表 。

---

**LEFT OUTER JOIN**

```sql
# 查询所有员工所在的部门信息
SELECT e.employee_id, e.last_name, d.department_id, d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id;
```

---

**RIGHT OUTER JOIN**

```sql
# 查询所有部门的人员信息
SELECT e.employee_id, e.last_name, d.department_id, d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id;
```

---

### UNION的使用

**合并查询结果**

**利用UNION关键字，可以给出多条SELECT语句，并将它们的结果组合成单个结果集。合并 时，两个表对应的列数和数据类型必须相同，并且相互对应。各个SELECT语句之间使用UNION或UNION ALL关键字分隔。**

**语法格式**

```sql
SELECT column,... FROM table1
UNION [ALL]
SELECT column,... FROM table2
```

- UNION操作符：UNION 操作符返回两个查询的结果集的并集，去除重复记录。
- UNION ALL操作符：UNION ALL操作符返回两个查询的结果集的并集。对于两个结果集的重复部分，不去重。

> - 注意：执行UNION ALL语句时所需要的资源比UNION语句少。如果明确知道合并数据后的结果数据不存在重复数据，或者不需要去除重复的数据，则尽量使用UNION ALL语句，以提高数据查询的效率。

```sql
# 查询部门编号>90或邮箱包含a的员工信息

# 方式一
SELECT last_name, department_id
FROM employees
WHERE department_id > 90 OR email LIKE '%a%';

# 方式二
SELECT *
FROM employees
WHERE email LIKE '%a%'
UNION
SELECT *
FROM employees
WHERE department_id > 90;
```

---

### 七种SQL JOINS的实现

**如图所示**

<img src="/img/mysql/image-20220531224324213.png">

```sql
# 中图（内连接）
SELECT e.last_name, e.employee_id, d.department_name, d.department_id
FROM employees e
JOIN departments d ON e.department_id = d.department_id;

# 左上图（左外连接）
SELECT e.last_name, e.employee_id, d.department_name, d.department_id
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id;

# 右上图（右外连接）
SELECT e.last_name, e.employee_id, d.department_name, d.department_id
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id;


# 左中图
SELECT e.last_name, e.employee_id, d.department_name, d.department_id
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id
WHERE e.department_id IS NULL;

# 右中图
SELECT e.last_name, e.employee_id, d.department_name, d.department_id
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id
WHERE e.department_id IS NULL;

# 左下图
SELECT e.last_name, e.employee_id, d.department_name, d.department_id
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id
UNION ALL
SELECT e.last_name, e.employee_id, d.department_name, d.department_id
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id
WHERE e.department_id IS NULL;

# 右下图
SELECT e.last_name, e.employee_id, d.department_name, d.department_id
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id
WHERE e.department_id IS NULL
UNION ALL
SELECT e.last_name, e.employee_id, d.department_name, d.department_id
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id
WHERE e.department_id IS NULL;
```

---

### SQL99语法新特性

1. 自然连接

**SQL99 在 SQL92 的基础上提供了一些特殊语法，比如 NATURAL JOIN 用来表示自然连接。我们可以把 自然连接理解为 SQL92 中的等值连接。它会帮你自动查询两张连接表中 所有相同的字段 ，然后进行 等值 连接 。**

**在SQL92标准中：**

```sql
SELECT employee_id,last_name,department_name
FROM employees e JOIN departments d
ON e.department_id = d.department_id
AND e.manager_id = d.manager_id;
```

**在 SQL99 中你可以写成：**

```sql
SELECT e.employee_id, e.last_name, d.department_name
FROM employees e 
NATURAL JOIN departments d;
```

2. USING连接

**当我们进行连接的时候，SQL99还支持使用 USING 指定数据表里的 同名字段 进行等值连接。但是只能配 合JOIN一起使用。比如：**

```sql
SELECT employee_id,last_name,department_name
FROM employees e JOIN departments d
USING (department_id);
```

**你能看出与自然连接 NATURAL JOIN 不同的是，USING 指定了具体的相同的字段名称，你需要在 USING 的括号 () 中填入要指定的同名字段。同时使用 JOIN...USING 可以简化 JOIN ON 的等值连接。它与下 面的 SQL 查询结果是相同的：**

```sql
SELECT employee_id,last_name,department_name
FROM employees e ,departments d
WHERE e.department_id = d.department_id;
```

---

### 小结

**表连接的约束条件可以有三种方式：WHERE, ON, USING**

- WHERE：适用于所有关联查询
- ON ：只能和JOIN一起使用，只能写关联条件。虽然关联条件可以并到WHERE中和其他条件一起 写，但分开写可读性更好。
- USING：只能和JOIN一起使用，而且要求两个关联字段在关联表中名称一致，而且只能表示关联字 段值相等

> - 我们要控制连接表的数量 。
> - 多表连接就相当于嵌套 for 循环一样，非常消耗资源，会让 SQL 查询性能下 降得很严重，因此不要连接不必要的表。
> - 在许多 DBMS 中，也都会有最大连接表的限制。

```sql
# 习题巩固
# 注意：当两个表外连接之后，组成主表和从表，主表的连接字段是不为空的，
# 从表的连接字段可能为空，因此从表的关键字段用来判断是否为空。

# 1.查询哪些部门没有员工

# 方式一（外连接）
SELECT d.department_id
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id
WHERE e.department_id IS NULL;

# 方式二（子查询）
SELECT d.department_id
FROM departments d
WHERE NOT EXISTS (
                  SELECT *
                  FROM employees e
                  WHERE e.department_id = d.department_id
)

# 2.查询哪个城市没有部门

# 方式一（外连接）
SELECT l.city
FROM departments d
RIGHT JOIN locations l ON d.location_id = l.location_id
WHERE d.location_id IS NULL;

# 方式二（子查询）
SELECT l.city
FROM locations l
WHERE NOT EXISTS (
                  SELECT *
                  FROM departments d
                  WHERE l.location_id = d.location_id
);

# 3.查询部门名为 Sales 或 IT 的员工信息
SELECT e.last_name, e.employee_id, e.salary, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE d.department_name IN ('Sales', 'IT');
```


## 第七章：单行函数

### 数值函数

1. 基本函数

| 函数                | 用法                                                         |
| ------------------- | ------------------------------------------------------------ |
| ABS(x)              | 返回x的绝对值                                                |
| SIGN(X)             | 返回一个数字的符号（正数返回1，负数返回-1，0返回0）                                                       |
| PI()                | 返回圆周率的值                                               |
| CEIL(x)，CEILING(x) | 返回大于或等于某个值的最小整数                               |
| FLOOR(x)            | 返回小于或等于某个值的最大整数                               |
| ROUND(x)            | 返回一个对x的值进行四舍五入后，最接近于X的整数               |
| ROUND(x,y)          | 返回一个对x的值进行四舍五入后最接近X的值，并保留到小数点后面Y位 |
| LEAST(e1,e2,e3…)    | 返回列表中的最小值                                           |
| GREATEST(e1,e2,e3…) | 返回列表中的最大值                                           |
| MOD(x,y)            | 返回X除以Y后的余数                                           |
| RAND()              | 返回0~1的随机值                                              |
| RAND(x)             | 返回0~1的随机值，其中x的值用作种子值，相同的X值会产生相同的随机 数 |
| TRUNCATE(x,y)       | 返回数字x截断为y位小数的结果                                 |
| SQRT(x)             | 返回x的平方根。当X的值为负数时，返回NULL                     |

2. 角度与弧度互换函数

| 函数       | 用法                                  |
| ---------- | ------------------------------------- |
| RADIANS(x) | 将角度转化为弧度，其中，参数x为角度值 |
| DEGREES(x) | 将弧度转化为角度，其中，参数x为弧度值 |

3. 三角函数

| 函数       | 用法                                                         |
| ---------- | ------------------------------------------------------------ |
| SIN(x)     | 将角度转化为弧度，其中，参数x为角度值                        |
| ASIN(x)    | 将弧度转化为角度，其中，参数x为弧度值                        |
| COS(x)     | 返回x的余弦值，其中，参数x为弧度值                           |
| ACOS(x)    | 返回x的反余弦值，即获取余弦为x的值。如果x的值不在-1到1之间，则返回NULL |
| TAN(x)     | 返回x的正切值，其中，参数x为弧度值                           |
| ATAN(x)    | 返回x的反正切值，即返回正切值为x的值                         |
| ATAN2(m,n) | 返回两个参数的反正切值                                       |
| COT(x)     | 返回x的余切值，其中，X为弧度值                               |

4. 指数与对数函数

| 函数                 | 用法                                                 |
| -------------------- | ---------------------------------------------------- |
| POW(x,y)，POWER(X,Y) | 返回x的y次方                                         |
| EXP(X)               | 返回e的X次方，其中e是一个常数，2.718281828459045     |
| LN(X)，LOG(X)        | 返回以e为底的X的对数，当X <= 0 时，返回的结果为NULL  |
| LOG10(X)             | 返回以10为底的X的对数，当X <= 0 时，返回的结果为NULL |
| LOG2(X)              | 返回以2为底的X的对数，当X <= 0 时，返回NULL          |

5. 进制间的转换

| 函数          | 用法                     |
| ------------- | ------------------------ |
| BIN(x)        | 返回x的二进制编码        |
| HEX(x)        | 返回x的十六进制编码      |
| OCT(x)        | 返回x的八进制编码        |
| CONV(x,f1,f2) | 返回f1进制数变成f2进制数 |

### 字符串函数

| 函数                              | 用法                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| ASCII(S)                          | 返回字符串S中的第一个字符的ASCII码值                         |
| CHAR_LENGTH(s)                    | 返回字符串s的字符数。作用与CHARACTER_LENGTH(s)相同           |
| LENGTH(s)                         | 返回字符串s的字节数，和字符集有关                            |
| CONCAT(s1,s2,......,sn)           | 连接s1,s2,......,sn为一个字符串                              |
| CONCAT_WS(x, s1,s2,......,sn)     | 同CONCAT(s1,s2,...)函数，但是每个字符串之间要加上x           |
| INSERT(str, idx, len, replacestr) | 将字符串str从第idx位置开始，len个字符长的子串替换为字符串replacestr |
| REPLACE(str, a, b)                | 用字符串b替换字符串str中所有出现的字符串a                    |
| UPPER(s) 或 UCASE(s)              | 将字符串s的所有字母转成大写字母                              |
| LOWER(s) 或LCASE(s)               | 将字符串s的所有字母转成小写字母                              |
| LEFT(str,n)                       | 返回字符串str最左边的n个字符                                 |
| RIGHT(str,n)                      | 返回字符串str最右边的n个字符                                 |
| LPAD(str, len, pad)               | 用字符串pad对str最左边进行填充，直到str的长度为len个字符     |
| RPAD(str ,len, pad)               | 用字符串pad对str最右边进行填充，直到str的长度为len个字符     |
| LTRIM(s)                          | 去掉字符串s左侧的空格                                        |
| RTRIM(s)                          | 去掉字符串s右侧的空格                                        |
| TRIM(s)                           | 去掉字符串s开始与结尾的空格                                  |
| TRIM(s1 FROM s)                   | 去掉字符串s开始与结尾的s1                                    |
| TRIM(LEADING s1 FROM s)           | 去掉字符串s开始处的s1                                        |
| TRIM(TRAILING s1 FROM s)          | 去掉字符串s结尾处的s1                                        |
| REPEAT(str, n)                    | 返回str重复n次的结果                                         |
| SPACE(n)                          | 返回n个空格                                                  |
| STRCMP(s1,s2)                     | 比较字符串s1,s2的ASCII码值的大小                             |
| SUBSTR(s,index,len)               | 返回从字符串s的index位置其len个字符，作用与SUBSTRING(s,n,len)、 MID(s,n,len)相同 |
| LOCATE(substr,str)                | 返回字符串substr在字符串str中首次出现的位置，作用于POSITION(substr IN str)、INSTR(str,substr)相同。未找到，返回0 |
| ELT(m,s1,s2,…,sn)                 | 返回指定位置的字符串，如果m=1，则返回s1，如果m=2，则返回s2，如果m=n，则返回sn |
| FIELD(s,s1,s2,…,sn)               | 返回字符串s在字符串列表中第一次出现的位置                    |
| FIND_IN_SET(s1,s2)                | 返回字符串s1在字符串s2中出现的位置。其中，字符串s2是一个以逗号分隔的字符串 |
| REVERSE(s)                        | 返回s反转后的字符串                                          |
| NULLIF(value1,value2)             | 比较两个字符串，如果value1与value2相等，则返回NULL，否则返回 value1 |

> 注意：MySQL中，字符串的位置是从1开始的。

### 日期和时间函数

1. 获取日期、时间

| 函数                                                         | 用法                            |
| ------------------------------------------------------------ | ------------------------------- |
| CURDATE() ，CURRENT_DATE()                                   | 返回当前日期，只包含年、 月、日 |
| CURTIME() ， CURRENT_TIME()                                  | 返回当前时间，只包含时、 分、秒 |
| NOW() / SYSDATE() / CURRENT_TIMESTAMP() / LOCALTIME() / LOCALTIMESTAMP() | 返回当前系统日期和时间          |
| UTC_DATE()                                                   | 返回UTC（世界标准时间） 日期    |
| UTC_TIME()                                                   | 返回UTC（世界标准时间） 时间    |

2. 日期与时间戳的转换

| 函数                     | 用法                                                         |
| ------------------------ | ------------------------------------------------------------ |
| UNIX_TIMESTAMP()         | 以UNIX时间戳的形式返回当前时间。SELECT UNIX_TIMESTAMP() - >1634348884 |
| UNIX_TIMESTAMP(date)     | 将时间date以UNIX时间戳的形式返回。                           |
| FROM_UNIXTIME(timestamp) | 将UNIX时间戳的时间转换为普通格式的时间                       |

3. 获取月份、星期、星期数、天数等函数

| 函数                                     | 用法                                             |
| ---------------------------------------- | ------------------------------------------------ |
| YEAR(date) / MONTH(date) / DAY(date)     | 返回具体的日期值                                 |
| HOUR(time) / MINUTE(time) / SECOND(time) | 返回具体的时间值                                 |
| FROM_UNIXTIME(timestamp)                 | 将UNIX时间戳的时间转换为普通格式的时间           |
| MONTHNAME(date)                          | 返回月份：January，...                           |
| DAYNAME(date)                            | 返回星期几：MONDAY，TUESDAY.....SUNDAY           |
| WEEKDAY(date)                            | 返回周几，注意，周1是0，周2是1，。。。周日是6    |
| QUARTER(date)                            | 返回日期对应的季度，范围为1～4                   |
| WEEK(date) ， WEEKOFYEAR(date)           | 返回一年中的第几周                               |
| DAYOFYEAR(date)                          | 返回日期是一年中的第几天                         |
| DAYOFMONTH(date)                         | 返回日期位于所在月份的第几天                     |
| DAYOFWEEK(date)                          | 返回周几，注意：周日是1，周一是2，。。。周六是 7 |

4. 日期的操作函数

| 函数                    | 用法                                       |
| ----------------------- | ------------------------------------------ |
| EXTRACT(type FROM date) | 返回指定日期中特定的部分，type指定返回的值 |

**EXTRACT(type FROM date)函数中type的取值与含义：**

<img src="/img/mysql/image-20220601162705975.png">

5. 时间和秒钟转换的函数

| 函数                 | 用法                                                         |
| -------------------- | ------------------------------------------------------------ |
| TIME_TO_SEC(time)    | 将 time 转化为秒并返回结果值。转化的公式为： 小时*3600+分钟 *60+秒 |
| SEC_TO_TIME(seconds) | 将 seconds 描述转化为包含小时、分钟和秒的时间                |

6. 计算日期和时间的函数

| 函数                                                         | 用法                                           |
| ------------------------------------------------------------ | ---------------------------------------------- |
| DATE_ADD(datetime, INTERVAL expr type)， ADDDATE(date,INTERVAL expr type) | 返回与给定日期时间相差INTERVAL时间段的日期时间 |
| DATE_SUB(date,INTERVAL expr type)， SUBDATE(date,INTERVAL expr type) | 返回与date相差INTERVAL时间间隔的日期           |

**上述函数中type的取值：**

<img src="/img/mysql/image-20220601165055639.png">

| 函数                         | 用法                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| ADDTIME(time1,time2)         | 返回time1加上time2的时间。当time2为一个数字时，代表的是 秒 ，可以为负数 |
| SUBTIME(time1,time2)         | 返回time1减去time2后的时间。当time2为一个数字时，代表的 是 秒 ，可以为负数 |
| DATEDIFF(date1,date2)        | 返回date1 - date2的日期间隔天数                              |
| TIMEDIFF(time1, time2)       | 返回time1 - time2的时间间隔                                  |
| FROM_DAYS(N)                 | 返回从0000年1月1日起，N天以后的日期                          |
| TO_DAYS(date)                | 返回日期date距离0000年1月1日的天数                           |
| LAST_DAY(date)               | 返回date所在月份的最后一天的日期                             |
| MAKEDATE(year,n)             | 针对给定年份与所在年份中的天数返回一个日期                   |
| MAKETIME(hour,minute,second) | 将给定的小时、分钟和秒组合成时间并返回                       |
| PERIOD_ADD(time,n)           | 返回time加上n后的时间                                        |

7. 日期的格式化与解析

| 函数                              | 用法                                       |
| --------------------------------- | ------------------------------------------ |
| DATE_FORMAT(date,fmt)             | 按照字符串fmt格式化日期date值              |
| TIME_FORMAT(time,fmt)             | 按照字符串fmt格式化时间time值              |
| GET_FORMAT(date_type,format_type) | 返回日期字符串的显示格式                   |
| STR_TO_DATE(str, fmt)             | 按照字符串fmt对str进行解析，解析为一个日期 |

**上述 非GET_FORMAT 函数中fmt参数常用的格式符：**

| 格式符 | 说明                                                         | 格式符  | 说明                                                         |
| ------ | ------------------------------------------------------------ | ------- | ------------------------------------------------------------ |
| %Y     | 4位数字表示年份                                              | %y      | 表示两位数字表示年份                                         |
| %M     | 月名表示月份（January,....）                                 | %m      | 两位数字表示月份 （01,02,03。。。）                          |
| %b     | 缩写的月名（Jan.，Feb.，....）                               | %c      | 数字表示月份（1,2,3,...）                                    |
| %D     | 英文后缀表示月中的天数 （1st,2nd,3rd,...）                   | %d      | 两位数字表示月中的天数(01,02...)                             |
| %e     | 数字形式表示月中的天数 （1,2,3,4,5.....）                    |         |                                                              |
| %H     | 两位数字表示小数，24小时制 （01,02..）                       | %h 和%I | 两位数字表示小时，12小时制 （01,02..）                       |
| %k     | 数字形式的小时，24小时制(1,2,3)                              | %l      | 数字形式表示小时，12小时制 （1,2,3,4....）                   |
| %i     | 两位数字表示分钟（00,01,02）                                 | %S 和%s | 两位数字表示秒(00,01,02...)                                  |
| %W     | 一周中的星期名称（Sunday...）                                | %a      | 一周中的星期缩写（Sun.， Mon.,Tues.，..）                    |
| %w     | 以数字表示周中的天数 (0=Sunday,1=Monday....)                 |         |                                                              |
| %j     | 以3位数字表示年中的天数(001,002...)                          | %U      | 以数字表示年中的第几周， （1,2,3。。）其中Sunday为周中第一 天 |
| %u     | 以数字表示年中的第几周， （1,2,3。。）其中Monday为周中第一 天 |         |                                                              |
| %T     | 24小时制                                                     | %r      | 12小时制                                                     |
| %p     | AM或PM                                                       | %%      | 表示%                                                        |

### 流程控制函数

**流程处理函数可以根据不同的条件，执行不同的处理流程，可以在SQL语句中实现不同的条件选择。 MySQL中的流程处理函数主要包括IF()、IFNULL()和CASE()函数。**

| 函数                                                         | 用法                                             |
| ------------------------------------------------------------ | ------------------------------------------------ |
| IF(value,value1,value2)                                      | 如果value的值为TRUE，返回value1， 否则返回value2 |
| IFNULL(value1, value2)                                       | 如果value1不为NULL，返回value1，否则返回value2   |
| CASE WHEN 条件1 THEN 结果1 WHEN 条件2 THEN 结果2 .... [ELSE resultn] END | 相当于Java的if...else if...else...               |
| CASE expr WHEN 常量值1 THEN 值1 WHEN 常量值1 THEN 值1 .... [ELSE 值n] END | 相当于Java的switch...case...                     |

### 加密与解密函数

**加密与解密函数主要用于对数据库中的数据进行加密和解密处理，以防止数据被他人窃取。这些函数在保证数据库安全时非常有用。**

| 函数                        | 用法                                                         |
| --------------------------- | ------------------------------------------------------------ |
| PASSWORD(str)               | 返回字符串str的加密版本，41位长的字符串。加密结果不可逆 ，常用于用户的密码加密 |
| MD5(str)                    | 返回字符串str的md5加密后的值，也是一种加密方式。若参数为 NULL，则会返回NULL |
| SHA(str)                    | 从原明文密码str计算并返回加密后的密码字符串，当参数为 NULL时，返回NULL。 SHA加密算法比MD5更加安全 。 |
| ENCODE(value,password_seed) | 返回使用password_seed作为加密密码加密value                   |
| DECODE(value,password_seed) | 返回使用password_seed作为加密密码解密value                   |

### MySQL信息函数

**MySQL中内置了一些可以查询MySQL信息的函数，这些函数主要用于帮助数据库开发或运维人员更好地 对数据库进行维护工作。**

| 函数                                                   | 用法                                                      |
| ------------------------------------------------------ | --------------------------------------------------------- |
| VERSION()                                              | 返回当前MySQL的版本号                                     |
| CONNECTION_ID()                                        | 返回当前MySQL服务器的连接数                               |
| DATABASE()，SCHEMA()                                   | 返回MySQL命令行当前所在的数据库                           |
| USER()，CURRENT_USER()、SYSTEM_USER()， SESSION_USER() | 返回当前连接MySQL的用户名，返回结果格式为 “主机名@用户名” |
| CHARSET(value)                                         | 返回字符串value自变量的字符集                             |
| COLLATION(value)                                       | 返回字符串value的比较规则                                 |

**MySQL中有些函数无法对其进行具体的分类，但是这些函数在MySQL的开发和运维过程中也是不容忽视 的。**

| 函数                           | 用法                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| FORMAT(value,n)                | 返回对数字value进行格式化后的结果数据。n表示 四舍五入 后保留 到小数点后n位 |
| CONV(value,from,to)            | 将value的值进行不同进制之间的转换                            |
| INET_ATON(ipvalue)             | 将以点分隔的IP地址转化为一个数字                             |
| INET_NTOA(value)               | 将数字形式的IP地址转化为以点分隔的IP地址                     |
| BENCHMARK(n,expr)              | 将表达式expr重复执行n次。用于测试MySQL处理expr表达式所耗费 的时间 |
| CONVERT(value USING char_code) | 将value所使用的字符编码修改为char_code                       |

## 第八章：聚合函数

### 聚合函数介绍

**什么是聚合函数**

> - 聚合函数作用于一组数据，并对一组数据返回一个值。

**聚合函数的类型**

> - AVG()
> - SUM()
> - MIN()
> - MAX()
> - COUNT()

1. AVG和SUM函数

```sql
SELECT department_id, AVG(salary), SUM(salary)
FROM employees
WHERE department_id IN (40, 50)
```
---

2. MIN和MAX函数

```sql
SELECT department_id, MIN(salary), MAX(salary)
FROM employees
WHERE department_id IN (40, 50)
```
---

3. COUNT函数

```sql
SELECT COUNT(*)
FROM employees
WHERE department_id = 40;
```

- 问题：用count(*)，count(1)，count(列名)谁好呢?
> - 其实，对于MyISAM引擎的表是没有区别的。这种引擎内部有一计数器在维护着行数。 Innodb引擎的表用count(*),count(1)直接读行数，复杂度是O(n)，因为innodb真的要去数一遍。但好 于具体的count(列名)。

- 问题：能不能使用count(列名)替换count(*)?
> - 不要使用 count(列名)来替代 count() ， count() 是 SQL92 定义的标准统计行数的语法，跟数 据库无关，跟 NULL 和非 NULL 无关。 说明：count(*)会统计值为 NULL 的行，而 count(列名)不会统计此列为 NULL 值的行。

### GROUP BY

1. 基本使用

**可以使用GROUP BY子句将表中的数据分成若干组**

```sql
SELECT column, group_function(column)
FROM table
[WHERE condition]
[GROUP BY group_by_expression]
[ORDER BY column];
```
> - 结论1：SELECT中出现的非组函数的字段必须声明在GROUP BY中。
> - 反之，GROUP BY中声明的字段可以不出现在SELECT中。
> - 结论2：GROUP BY声明在FROM后面、WHERE后面、ORDER BY前面、LIMIT前面。

---

2. 使用WITH ROLLBACK

**总计**

```sql
SELECT department_id,AVG(salary)
FROM employees
WHERE department_id > 80
GROUP BY department_id WITH ROLLUP;
```
> - 注意： 当使用ROLLUP时，不能同时使用ORDER BY子句进行结果排序，即ROLLUP和ORDER BY是互相排斥的。

---

### HAVING

**过滤分组：HAVING子句**

> - 行已经被分组。
> - 使用了聚合函数。
> - 满足HAVING 子句中条件的分组将被显示。
> - HAVING 不能单独使用，必须要跟 GROUP BY 一起使用。

1. 基本使用

```sql
SELECT department_id, MAX(salary)
FROM employees
GROUP BY department_id
HAVING MAX(salary) > 8000;
```

**要求**

> - 如果过滤条件中使用了聚合函数，则必须使用HAVING来替换WHERE。否则，报错。
> - 当过滤条件中没有聚合函数时，则次过滤条件声明在WHERE中或HAVING中都可以。但是，建议声明在WHERE中的执行效率高。
> - HAVING必须声明在GROUP BY 的后面
> - 开发中，我们使用HAVING的前提是SQL中使用了GROUP BY。

---

2. WHERE和HAVING的对比

**区别1：WHERE 可以直接使用表中的字段作为筛选条件，但不能使用分组中的计算函数作为筛选条件； HAVING 必须要与 GROUP BY 配合使用，可以把分组计算的函数和分组字段作为筛选条件。**

> - 这决定了，在需要对数据进行分组统计的时候，HAVING 可以完成 WHERE 不能完成的任务。这是因为， 在查询语法结构中，WHERE 在 GROUP BY 之前，所以无法对分组结果进行筛选。HAVING 在 GROUP BY 之 后，可以使用分组字段和分组中的计算函数，对分组的结果集进行筛选，这个功能是 WHERE 无法完成 的。另外，WHERE排除的记录不再包括在分组中。

**区别2：如果需要通过连接从关联表中获取需要的数据，WHERE 是先筛选后连接，而 HAVING 是先连接 后筛选。**

> - 这一点，就决定了在关联查询中，WHERE 比 HAVING 更高效。因为 WHERE 可以先筛选，用一 个筛选后的较小数据集和关联表进行连接，这样占用的资源比较少，执行效率也比较高。HAVING 则需要 先把结果集准备好，也就是用未被筛选的数据集进行关联，然后对这个大的数据集进行筛选，这样占用 的资源就比较多，执行效率也较低。

**小结如下**

| 关键字 | 用法 | 缺点 |
| ----- | --- | --- |
| WHERE | 先筛选数据再关联，执行效率高 | 不能使用分组中的计算函数进行筛选 |
| HAVING | 可以使用分组中的计算函数 | 在最后的结果集中进行筛选，执行效率较低 |

**开发中的选择：**

> - WHERE 和 HAVING 也不是互相排斥的，我们可以在一个查询里面同时使用 WHERE 和 HAVING。包含分组 统计函数的条件用 HAVING，普通条件用 WHERE。这样，我们就既利用了 WHERE 条件的高效快速，又发 挥了 HAVING 可以使用包含分组统计函数的查询条件的优点。当数据量特别大的时候，运行效率会有很 大的差别。

### SELECT的执行过程

1. 查询的结构

```sql
#方式1：
SELECT ...,....,...
FROM ...,...,....
WHERE 多表的连接条件
AND 不包含组函数的过滤条件
GROUP BY ...,...
HAVING 包含组函数的过滤条件
ORDER BY ... ASC/DESC
LIMIT ...,...
#方式2：
SELECT ...,....,...
FROM ... JOIN ...
ON 多表的连接条件
JOIN ...
ON ...
WHERE 不包含组函数的过滤条件
AND/OR 不包含组函数的过滤条件
GROUP BY ...,...
HAVING 包含组函数的过滤条件
ORDER BY ... ASC/DESC
LIMIT ...,...
#其中：
#（1）from：从哪些表中筛选
#（2）on：关联多表查询时，去除笛卡尔积
#（3）where：从表中筛选的条件
#（4）group by：分组依据
#（5）having：在统计结果中再次筛选
#（6）order by：排序
#（7）limit：分页
```

**需要记住 SELECT 查询时的两个顺序：**

- 关键字的顺序是不能颠倒的：

```sql
SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY ... LIMIT...
```

- SELECT 语句的执行顺序（在 MySQL 和 Oracle 中，SELECT 执行顺序基本相同）：

```sql
FROM -> WHERE -> GROUP BY -> HAVING -> SELECT 的字段 -> DISTINCT -> ORDER BY -> LIMIT
```

**比如你写了一个 SQL 语句，那么它的关键字顺序和执行顺序是下面这样的：**

```sql
SELECT DISTINCT player_id, player_name, count(*) as num # 顺序 5
FROM player JOIN team ON player.team_id = team.team_id # 顺序 1
WHERE height > 1.80 # 顺序 2
GROUP BY player.team_id # 顺序 3
HAVING num > 2 # 顺序 4
ORDER BY num DESC # 顺序 6
LIMIT 2 # 顺序 7
```

> - 在 SELECT 语句执行这些步骤的时候，每个步骤都会产生一个 虚拟表 ，然后将这个虚拟表传入下一个步 骤中作为输入。需要注意的是，这些步骤隐含在 SQL 的执行过程中，对于我们来说是不可见的。

---

2. SQL执行原理

**SELECT 是先执行 FROM 这一步的。在这个阶段，如果是多张表联查，还会经历下面的几个步骤：**

- 首先先通过 CROSS JOIN 求笛卡尔积，相当于得到虚拟表 vt（virtual table）1-1；
- 通过 ON 进行筛选，在虚拟表 vt1-1 的基础上进行筛选，得到虚拟表 vt1-2；
- 添加外部行。如果我们使用的是左连接、右链接或者全连接，就会涉及到外部行，也就是在虚拟 表 vt1-2 的基础上增加外部行，得到虚拟表 vt1-3。
- 当然如果我们操作的是两张以上的表，还会重复上面的步骤，直到所有表都被处理完为止。这个过程得 到是我们的原始数据。
- 然后进入第三步和第四步，也就是 GROUP 和 HAVING 阶段 。在这个阶段中，实际上是在虚拟表 vt2 的 基础上进行分组和分组过滤，得到中间的虚拟表 vt3 和 vt4 。
- 当我们完成了条件筛选部分之后，就可以筛选表中提取的字段，也就是进入到 SELECT 和 DISTINCT 阶段 。
- 首先在 SELECT 阶段会提取想要的字段，然后在 DISTINCT 阶段过滤掉重复的行，分别得到中间的虚拟表 vt5-1 和 vt5-2 。
- 当我们提取了想要的字段数据之后，就可以按照指定的字段进行排序，也就是 ORDER BY 阶段 ，得到 虚拟表 vt6 。
- 最后在 vt6 的基础上，取出指定行的记录，也就是 LIMIT 阶段 ，得到最终的结果，对应的是虚拟表 vt7 。
- 当然我们在写 SELECT 语句的时候，不一定存在所有的关键字，相应的阶段就会省略。

**同时因为 SQL 是一门类似英语的结构化查询语言，所以我们在写 SELECT 语句的时候，还要注意相应的 关键字顺序，所谓底层运行的原理，就是我们刚才讲到的执行顺序。**

## 第九章：子查询

[笔记来源：https://github.com/codinglin/StudyNotes](https://github.com/codinglin/StudyNotes)
