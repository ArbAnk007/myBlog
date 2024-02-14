import { useParams } from "react-router-dom";
import { PostForm } from "../components";
import { useState, useEffect } from "react";
import databaseService from "../lib/database";
import { PageNotFound } from "./index";
import { useSelector } from "react-redux";

function EditPostPage() {
  const { slug } = useParams();
  const userInfo = useSelector(state => state?.user?.info);
  const [postInfo, setPostInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    databaseService.getPost(slug).then((response) => {
      if (response !== undefined && response !== false) {
        setPostInfo(response);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (!loading) {
    if (postInfo && postInfo.userId === userInfo.$id) {
      return <PostForm post={postInfo} />;
    } else {
      return <PageNotFound />;
    }
  }
}

export default EditPostPage;
