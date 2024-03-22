
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {

  return (

    <div className='mt-10 sm:mt-16 prompt_layout'>
      {
        data.map((post) => {
          return <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        })
      }

    </div>
  )
}

export default PromptCardList
