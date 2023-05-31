import React, { useEffect, useState } from 'react'
import { COLLECTION_ID, DATABASES_ID, databases } from '../appwrite/appwriteConfig'
import Check from '../images/icon-check.svg'

import { AiOutlineClose } from 'react-icons/ai'
import styles from './todos.module.css'
import { Query } from 'appwrite'



const Todos = ({ fetchTodos, todos } ) => { 


  const [activeClass, setactiveClass] = useState({
    all: true,
    active: false,  
    completed: false
  })


  const toggleCompleted = (todo) => {
    const promise = databases.updateDocument(DATABASES_ID, COLLECTION_ID, todo.$id , {
      isComplete: !todo.isComplete
    })
    
    promise.then(function (response) {
      console.log(response); // Success
      fetchTodos()
    }
    , function (error) {
      console.log(error); // Failure
    });
  }

  const deleteTodo = (todo) => {
    const promise = databases.deleteDocument(DATABASES_ID, COLLECTION_ID, todo.$id)
    
    promise.then(function (response) {
      console.log(response); // Success
      fetchTodos()
    }, function (error) {
      console.log(error); // Failure
    });
  }

  const changeActiveClass = (type) => {
    setactiveClass({
      all: false,
      active: false,
      completed: false,
      [type]: true});
  }


  const clearCompleted = () => {

    todos.filter(todo => todo.completed).map(todo => deleteTodo(todo))

  }

  return (
    <ul
    className={`text-white bg-list-dark w-3/5 max-h-[45vh] overflow-y-auto overflow-x-hidden duration-200 ${styles.scrollingCustom}`}>
      {todos.map((todo, num) => {
        return (
          <li className={`border-b-[0.5px] border-[rgb(255,255,255,0.5)] w-full flex items-center justify-between py-5 px-3 bg-list-dark duration-300 hover:scale-[1.02] `} key={todo.$id}>

            <div className="leftListItem flex items-center gap-5">
              <div className={`border-2 rounded-full p-1 flex items-center justify-center ${todo.isComplete ? 'bg-check-gradient' : ''} min-w-[15px] min-h-[15px] hover:cursor-pointer`}
                onClick={() => toggleCompleted(todo)}
              >
                {
                  todo.isComplete && <img src={Check} alt="" />
                }

              </div>
              <p className={`text-lg ${todo.isComplete ? 'line-through text-list-font-dark font-semibold' : ""}`} >
                {todo.title}
              </p>
            </div>
            <div className="rightListItem items hover:cursor-pointer"
              onClick={() => {
                deleteTodo(todo)
              }}
            >
              <AiOutlineClose className="text-list-font-dark text-2xl" />
            </div>
          </li>
        )
      })}
      
    </ul>
  )
}

export default Todos