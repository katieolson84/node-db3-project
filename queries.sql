-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
select
p.productname, p.categoryid 
from product p
join category c
on p.categoryid = c.id
-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
select companyname
from shipper s
join `order` o
on o.shipvia = s.id
where o.orderdate < '2012-08-09'
-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
select orderid, productname, quantity 
from product p
join orderdetail o
on p.id = o.ProductId
where o.orderid = '10251'
-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
select o.id, c.companyname, e.lastname
from 'order' o
join customer c
on o.customerid = c.id
join employee e
on o.employeeid = e.id