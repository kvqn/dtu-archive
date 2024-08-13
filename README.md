# DTU Archive

A web application to easily access past result information for Delhi Technological University.

To see how to results are scraped and stored, check out [kvqn/dtu-archive-migrations](https://github.com/kvqn/dtu-archive-migrations).

### Why I made this?

I wanted to compare the different courses offered by the university and there didn't exist any solutions.

This is my gift to you, the analytical ones, that will spend their time fretting over choices they have and over analysing everything.

## FAQ

### \# There's a problem with the results

See [here](https://github.com/kvqn/dtu-archive-migrations#creating-an-issue)

### \# There's a feature I want to see added

Create an Issue.

# Database Setup

There are two databases for DTU Archive.

The **Migrations Database** stores the results data. This is where the migrations data from scraping tool at [dtu-archive-migrations](https://github.com/kvqn/dtu-archive-migrations) go. The intended way of interacting with this database is through RAW sql queries since most use cases require complex queries which are a hassle through ORMs.
This database is designed to be reproducible through the migrations. No backups required. The frontend should have no need to make any changes to this database.

The other database is called, due to the lack of creative naming sense, the **Other Database**. This contains all the other stuff that the application needs. This database should be backed up routinely.
