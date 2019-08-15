/**
 * Todo List Model
 */
export class TodoList {

    /**
     * Name of a list
     */
    public name: string;

    /**
     * List of todo items
     */
    public todos: string[];

    /**
     * Time last changes were made
     */
    public changed?: string;

    constructor(name: string, todos: string[], changed?: string
      ) {
        this.name = name;
        this.todos = todos;
        this.changed = changed;
      }
}
