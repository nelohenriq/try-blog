import getCurrentUser from "@/app/actions/getCurrentUser";
import getBlogsById from "@/app/actions/getBlogById";
import BlogId from "@/components/Blog/BlogId";

interface IParams {
  blogId: string;
}

export default async function page({ params }: { params: IParams }) {
  const blog = await getBlogsById(params);
  //console.log(blog);

  const currentUser = await getCurrentUser();
  return (
    <div>
      <div>
        <BlogId
          name={blog?.name}
          description={blog?.description}
          blogId={blog?.id}
          imageSrc={blog?.imageSrc}
        />
      </div>
    </div>
  );
}
