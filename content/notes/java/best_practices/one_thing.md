---
title: "One_thing"
date: 2022-09-03T15:19:47Z
tags: [ 'notes', 'java', 'best_practices', 'one_thing' ]
---

Object Oriented Programming has a set principles called `SOLID`.
[Baeldung has an article on them](https://www.baeldung.com/solid-principles).

What I want to talk about here is the Single Responsibility Principle.
That's the `S` in `SOLID`.

> As we might expect, this principle states that a class should only have one responsibility. Furthermore, it should only have one reason to change.

I had a discussion about this on some code I was reviewing.
These are some CR comments.

---

> The DAO usually does CRUD operations without any extra logic. This one has some serious logic behind it. I’m not sure what it does to be honest.
>
> When you try to keep your methods 3-5 lines long you tend to think about where you want to put your code, because you have limited space. That way your code is easier to read and if you think it through you put it where it’s supposed to go.
>
> Try limiting every single method you write to 3-5 lines (sometimes it’s not gonna happen, but it works 95% of the time) and make the method do one thing only. That way you’ll code will be kind of like lego bricks. You get a bunch of small bricks and when you piece them together you can build a castle and bombard it with the infected corpses of your enemies.

>I would disagree there is any extra logic in this Paginated DAO class.
>
> This method queries the DB in batches then passes the results without any data modification or none-query related filtering to a service for business logic. 
The closest thing to extra logic in the entire class is the generation of the query which I believe is logical positioning for the access required.

>What I mean by extra logic is something that a method does that’s not inside the one and only one thing the method is supposed to do. By reading the name I can see that this method generates products to save and it returns void. So it first generates the products and then saves them. That’s 2 things. It also does some SOLR stuff.
>
>All methods, classes, modules should do one thing and one thing only. If they do 2 things they specify it. I’ve read somewhere that a way to do this is by giving the method a name that makes it obvious that 2 thigs are being done like `doThisAndThat`.
>
>I think that the better impl for this is to have some class do the generation, some class do the saving and some class do whatever else is needed. Those classes don’t necessarily need to be created, they probably already exist.
>
>Doing it that way makes it easier to maintain, because it makes the code easier to read and it makes it easier to fix the problem if there is one. For example, if you have some bug that breaks saving, you have to focus your attention only on the method that does the saving and nothing else. If the problem is somewhere else you have to focus on that other thing. So when individual pieces work, the whole system works.
>
>By following those 2 rules (3-5 lines and 1 and 1 thing only) you get some nice code.

---

The Single Responsibility Principle should be applied not only to classes,
but methods, modules and any one piece of tech that's designed to solve a problem.
The 3-5 lines is arbitrary, but I find that it really improves readability.
If you think it's extreme, you're not alone.
It's called [Extreme programming](https://en.wikipedia.org/wiki/Extreme_programming)
for a reason.

