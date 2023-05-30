import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { COLLECTION_ID, DATABASES_ID, account, databases } from '../appwrite/appwriteConfig'
import TodoForm from './TodoForm'
import Todos from './Todos'
import styles from './Profile.module.css'
import Sun from '../images/icon-sun.svg'
import Moon from '../images/icon-moon.svg'
import { GrClose } from 'react-icons/gr'
import { Query } from 'appwrite'

const Profile = () => {
    const navigate= useNavigate()
    const [todos, setTodos] = useState([])
    const [userDetails, setuserDetails] = useState()
    const [showForm, setshowForm] = useState(false)


    const [activeClass, setactiveClass] = useState({
        all: true,
        active: false,
        completed: false
    })


    const toggleCompleted = (todo) => {
        const promise = databases.updateDocument(DATABASES_ID, COLLECTION_ID, todo.$id, {
            completed: !todo.completed
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
            [type]: true
        });
        fetchTodos(type)
    }


    const clearCompleted = () => {
        todos.filter(todo => todo.completed).map(todo => deleteTodo(todo))

    }


    useEffect(() => {
      const getData = account.get().then((res) => {
        console.log(res)
        setuserDetails(res)
      },(error) => {
        console.log(error)
        navigate('/login')
      })
    }, [])
    
    const handleLogout = () => {
        account.deleteSession('current').then((res) => {  
            console.log(res)
            navigate('/') 
        },(error) => {
            console.log(error)
        })
    }

    const fetchTodos = async (type = 'all') => {
        let promise;
        if (type === 'all') {
            promise = databases.listDocuments(DATABASES_ID, COLLECTION_ID)
        } else if (type === 'active') {
            promise = databases.listDocuments(DATABASES_ID, COLLECTION_ID, [
                Query.equal('completed', false )
            ])
        } else {
            promise = databases.listDocuments(DATABASES_ID, COLLECTION_ID, [
                Query.equal('completed', [true])
            ])
        }

        promise.then(function (response) {
            setTodos(response.documents)
            console.log(response); // Success
        }, function (error) {
            console.log(error); // Failure
        });
    }
    
    useEffect(() => {
        fetchTodos()
    }, [])

  return (
    <div className="min-h-[100vh] bg-bg-dark ">
          {/* FORM MODAL */}
          {showForm &&
              <TodoForm fetchTodos={fetchTodos} setshowForm={setshowForm} />}


          <div className="topDiv bg-bg-desktop-dark w-full min-h-[35vh] bg-no-repeat bg-cover flex justify-between items-center">
              <nav className="topDiv_nav flex justify-between items-center w-[45%] m-auto">
                  <header className=" text-5xl tracking-widest font-semibold"
                  style={{ color: '#fff' }}
                  >
                    T O D O
                </header>
                <div className="right flex items-center gap-5 w-1/7">
                    <div className="toggle flex items-center justify-center hover:cursor-pointer">
                        <img src={Sun} alt="toggle site theme between night/light" />
                    </div>

                    <button className="first-letter bg-transparent font-bold border-2 text-lg p-1 text-white" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
        </div>
        {userDetails ? 
              <div className="todo_container w-3/4 m-auto flex flex-col items-center justify-center -mt-10">
                <div className="w-3/5 -mt-10 mb-10 flex items-center justify-between py-4 px-3 bg-list-dark duration-300 hover:scale-[1.02]"
                onClick={() => setshowForm(true)}
                >
                      <div className="leftListItem flex items-center gap-5">
                          <div className={`border-2 border-list-font-dark rounded-full p-1 flex items-center justify-center min-w-[15px] min-h-[15px] hover:cursor-pointer`}
                              
                          ></div>
                          <p className={`text-lg text-list-font-dark font-semibold`} >
                              Start writing...
                          </p>
                      </div>
                </div>
                  <Todos 
                  fetchTodos={fetchTodos}
                  todos={todos}
                  />
                  <footer
                      className='flex w-3/5 items-center justify-between py-5 px-3 bg-list-dark text-white'
                  >
                      <div className="leftSifeFooter text-list-font-dark font-semibold">
                          {todos.length} items left
                      </div>
                      <ul className="centerSideFooter flex items-center gap-4 font-semibold text-sm">
                          <li className={`hover:cursor-pointer ${activeClass.all && 'text-color-blue'}`}
                              onClick={() => changeActiveClass('all')}
                          >
                              All
                          </li>
                          <li className={`hover:cursor-pointer ${activeClass.active && 'text-color-blue'}`}
                              onClick={() => changeActiveClass('active')}
                          >
                              Active
                          </li>
                          <li className={`hover:cursor-pointer ${activeClass.completed && 'text-color-blue'}`}
                              onClick={() => changeActiveClass('completed')}
                          >
                              Completed
                          </li>
                      </ul>
                      <div className="rightSideFooter hover:cursor-pointer" onClick={clearCompleted} >
                          Clear Completed
                      </div>
                  </footer>
            </div>
            :
            <>
                <p className="mt-4">
                    Please Login To see Profile{" "}
                    <Link to="/" className="text-blue-500 hover:underline">
                        <span className="bg-blue-300 p-2 cursor-pointer text-white">
                            Login
                        </span>
                    </Link>
                </p>
            </>
        }
        
    </div>
  )
}

export default Profile