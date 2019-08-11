/**
 * Todo List Model
 */
export interface TodoList {
    /**
     * Name of a list
     */
    name: string;

    /**
     * List id
     */
    id: string;

    /**
     * Time last changes were made
     */
    changed: Date;

    /**
     * List of todo items
     */
    todos: string[];
}
