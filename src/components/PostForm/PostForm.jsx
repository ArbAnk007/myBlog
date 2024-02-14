import "../../styles/PostForm.css"
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import storageService from "../../lib/storage";
import databaseService from "../../lib/database";
import { DefaultBtn, Input, RTE, Select } from "../index"
import { useNavigate } from "react-router-dom";

function PostForm({post}) {

  const { register, handleSubmit, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      status: post?.status || "active"
    }
  })

  const navigate = useNavigate()
  const userData = useSelector(state => state.user.info)

  const onSubmit = async (data) => {
    if(post){
      const file = await storageService.uploadFile(data.image[0])

      if(file){
        await storageService.deleteFile(post.featuredImageId)
      }

      const dbPost = await databaseService.updatePost(post.$id, {...data, featuredImageId: file ? file.$id : undefined})

      if(dbPost){
        navigate(`/post/${dbPost.$id}`)
      }

    }else {
      const file = await storageService.uploadFile(data.image[0])
      const dbPost = await databaseService.createPost({...data, userId: userData.$id, featuredImageId: file ? file.$id : undefined})
      
      if(dbPost){
        navigate(`/post/${dbPost.$id}`)
      }
    }

  }

  return ( 
    <div className="post-form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="post-form-top-section">
          <Input 
            label={"Title"}
            type={"text"}
            placeholder={"Enter title"}
            {...register("title", {required: true})}
          />
          <Input 
            label={"Image"}
            type={"file"}
            {...register("image", {required: post ? false : true})}
          />
        </div>
        {
          post && 
          <div className="prev-img-container">
            <h3>Previous Image</h3>
            <img src={storageService.getFilePreview(post.featuredImageId)} alt="prev image" id="prev-img" />
          </div>
        }
        <div className="post-form-mid-section">
          <RTE 
            control={control}
            name={"content"}
            defaultValue={getValues("content")}
            label={"Content"}
          />
        </div>
        <div className="post-form-bottom-section">
          <Select
            options={[["active", "Public"], ["inactive", "Private"]]}
            label={"Status"}
            {...register("status", {required: true})}
          />
          <DefaultBtn type={"submit"}>{post ? "Update" : "Submit"}</DefaultBtn>
        </div>
      </form>
    </div>
   );
}

export default PostForm;