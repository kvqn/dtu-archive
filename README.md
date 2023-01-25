
# cgpa-analysis

A very handy tool for analysis of results published by Delhi Technological University.

### The Problem

They publish result in PDF format. This is bad because it is not query-able.

### The Solution

Make the result an excel. This is good because excel is query-able.

### The Conclusion

- You can have sorted results
- You can have filtered results
- You can have compiled results
- You can have graphs and ranks
- You can analyse courses and teachers as well ( potential feature in the future 🤔 )


# Installation

1. Clone the git repo \
    `git clone https://github.com/kvqn/cgpa-analysis --depth=1`
2. Move into the git repo \
    `cd cgpa-analysis`
3. Satisfy the requirements \
    `pip install -r requirements.txt`


`OPTIONAL STEP` if you are a linux user, you can add an alias in your bashrc/zshrc

```bash
alias cgpa="python <path to the git clone>/cgpa"
```

this will make it very easy to use the program anywhere


# Usage

Enough talking, how to actually use the program

You have your result PDF. Just pass the path to that pdf into the following command

```bash
python cgpa complete <pdf>
```

If everything goes smoothly, it should create a .xlsx in the same directory.

If everything does not go smoothly, open an issue.
