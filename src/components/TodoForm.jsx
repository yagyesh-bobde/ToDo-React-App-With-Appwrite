import React, { useState } from 'react'
import styles from './TodoForm.module.css'
import { GrClose } from 'react-icons/gr'
import { COLLECTION_ID, DATABASES_ID, databases } from '../appwrite/appwriteConfig'
import { v4 as uuidv4 } from 'uuid'
import { AiOutlineClose } from 'react-icons/ai'

const TodoForm = ({ setshowForm, fetchTodos }) => {
    const [todo, setTodo] = useState({
        title: "",
        description: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const promise = databases.createDocument(DATABASES_ID, COLLECTION_ID, uuidv4(), todo)

        promise.then(function (response) {
            setTodo({
                title: "",
                description: ""
            })
            setshowForm(false)
            fetchTodos()
            console.log(response); // Success
        }, function (error) {
            console.log(error); // Failure
        });
    }
    
  return (
      <div className={styles.modal} >
        <form className={`${styles["modal-content"]} bg-list-dark`}
            onSubmit={handleSubmit}
          >
            <AiOutlineClose 
            onClick={() => setshowForm(false)}
            className="cursor-pointer absolute right-5 text-2xl " />
            <div className="form-input-div w-full  ">
                <label className="text-xl font-bold " htmlFor="">Title 
                <input type="text" className='w-full border-2 border-gray-300 px-3 py-2 rounded-md my-2 text-md text-black' placeholder="What to do?" onChange={(e) => setTodo({
                    ...todo,
                    title: e.target.value
                })} />
                </label>
            </div>

              <div className="form-input-div w-full my-4">
                <label className="text-xl font-bold" htmlFor="">Description
                <textarea className="border-4 w-full my-2 p-3 text-md text-black" type="text"
                rows={5}
                placeholder="Description" onChange={(e) => setTodo({    
                    ...todo,
                    description: e.target.value
                })} />

                </label>
              </div>
              <button 
              type="submit"
                class="bg-black text-white w-1/3 text-xl mx-auto py-2 rounded-xl font-bold">
                    Add Todo
              </button>
        </form>
    </div>
  )
}

export default TodoForm