# DevTodo - Developer's Task Manager CLI

## Overview

DevTodo is a simple command-line task manager designed for developers. It allows you to create, list, update, mark, and delete tasks efficiently through the terminal.

## Features

- **Initialize** the task manager
- **Add** new tasks
- **List** all tasks or filter by status
- **Update** task descriptions
- **Mark** tasks as Done, In-progress, or Todo
- **Delete** tasks

## Installation

To install DevTodo globally, run:

```sh
npm install -g devtodo
```

## Usage

Run the following commands to manage your tasks:

### Initialize

Before using DevTodo, initialize it with:

```sh
devtodo init
```

### Add a Task

```sh
devtodo add "Task description"
```

Example:

```sh
devtodo add "Finish the project report"
```

### List Tasks

List all tasks:

```sh
devtodo list
```

List tasks by status:

```sh
devtodo list done
```

```sh
devtodo list in-progress
```

```sh
devtodo list todo
```

### Update a Task

```sh
devtodo update <task_id> "New task description"
```

Example:

```sh
devtodo update 1 "Submit the project report"
```

### Mark Task Status

Mark as done:

```sh
devtodo mark-done <task_id>
```

Mark as in-progress:

```sh
devtodo mark-in-prog <task_id>
```

Mark as todo:

```sh
devtodo mark-todo <task_id>
```

### Delete a Task

```sh
devtodo delete <task_id>
```

Example:

```sh
devtodo delete 2
```

## Contributing

Feel free to open issues or submit pull requests to improve DevTodo.

## License

This project is licensed under the MIT License.
