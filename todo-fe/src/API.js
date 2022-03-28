import axios from "axios";

const url = "http://localhost:8000/";

export const API = {
    addTodo: (todoData) => {
        return axios.post(url, todoData);
    },

    getTodos: () => {
        return axios.get(url);
    },

    editTodo: (todoData) => {
        return axios.patch(url+todoData.id, todoData);
    },

    deleteTodo: (id) => {
        return axios.delete(url+id);
    }

}