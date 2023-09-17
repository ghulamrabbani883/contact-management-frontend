import { Link } from "react-router-dom"
import {BiCommentError} from 'react-icons/bi'


const Error404 = () => {
  return (
    <main className="mt-12 ml-12 flex justify-center items-center">
      <div className="flex flex-col gap-3 w-96 shadow-lg p-5 items-center">
        <div className="flex items-center">
          <BiCommentError size={36} />
        </div>
        <p className="text-textColor1 font-medium text-lg">No Page Found,</p>
        <Link
          className="h-fit w-fit px-3 py-2 bg-primary text-tertiary text-center  text-lg rounded hover:bg-secondary "
          to="/"
        >
          Go to home page
        </Link>
      </div>
    </main>
  )
}

export default Error404
