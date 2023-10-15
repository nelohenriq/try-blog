import getCurrentUser from "./actions/getCurrentUser";
import getBlogs from "./actions/getBlogs";
import SingleBlog from "@/components/Blog/SingleBlog";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const blogs = await getBlogs();
  //console.log(blogs);
  return (
    <main className=" flex min-h-screen flex-col items-center justify-between p-24">
      {blogs.map((item) => (
        <div key={item.id}>
          <SingleBlog data={item} key={item.id} currentUser={currentUser} />
        </div>
      ))}
    </main>
  );
}
