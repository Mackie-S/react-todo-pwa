import React, {useState, useEffect, useContext} from "react";
import * as Api from "../service/api"
import { signInWithGoogle } from "../service/firebase";
import dig from "object-dig";
import { AuthContext } from "../providers/AuthProvider";
import { ListItem } from "@mui/material";
import {ListItemIcon} from "@mui/material";
import {Checkbox} from "@mui/material";
import {ListItemText} from "@mui/material";
import {ListItemSecondaryAction} from "@mui/material";
import {IconButton} from "@mui/material";
import { DeleteSweep } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 360,
    margin: 'auto',
  },
  ul: {
    paddingLeft: 0,
    listStyle: 'none',
  },
  list: {
    justifyContent: 'space-between',
  },
}));

export const ToDoList = (props) => {
  const classes = useStyles();
  const deleteHandle = (id) => {
    Api.todoDelete(id);
    props.fetch();
  }
  const checkHandle = async (id) => {
    // Api経由でisCompleteの値を更新
    await Api.toggleComplete(id);
    props.fetch();
  }
  // propsを元にliタグを作る
  const todoList = props.todos.map((todo) => {
    return (
      // <li key={todo.id}>{todo.content}<button type="button" onClick={() => deleteHandle(todo.id)}>削除</button></li>
      <ListItem key={todo.id}>
        <ListItemIcon>
          <Checkbox checked={todo.isComplete} onChange={() => checkHandle(todo.id)}/>
          {/* <Checkbox checked="" onChange="" name="checkedA" /> */}
        </ListItemIcon>
        <ListItemText primary={todo.content} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={() => deleteHandle(todo.id)}>
            <DeleteSweep />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });
  return (
    <div className={classes.root}>
      <h2>あなたのToDo</h2>
      <ul className={classes.ul}>{todoList}</ul>
    </div>
  )
}