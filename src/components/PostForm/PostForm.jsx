import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import storageService from "../../lib/storage";
import databaseService from "../../lib/database";
import { DefaultBtn, Input, RTE, Select } from "../index"
import { useNavigate } from "react-router-dom";

function PostForm({post}) {

  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
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

      const dbPost = await databaseService.updatePost(post.$id, {...data, featuredImage: file ? file.$id : undefined})

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input 
            label={"Title"}
            type={"text"}
            placeholder={"Enter title"}
            {...register("title", {required: true})}
          />
          <Input 
            label={"Image"}
            type={"file"}
            {...register("image", {required: true})}
          />
        </div>
        {
          post && 
          <div>
            <img src={storageService.getFilePreview(post.featuredImageId)} alt="" />
          </div>
        }
        <div>
          <RTE 
            control={control}
            name={"content"}
            defaultValue={getValues("content")}
            label={"Content"}
          />
        </div>
        <div>
          <Select
            options={["active", "inactive"]}
            label={"status"}
            {...register("status", {required: true})}
          />
          <DefaultBtn type={"submit"}>{post ? "Update" : "Submit"}</DefaultBtn>
        </div>
      </form>
    </div>
   );
}

export default PostForm;