import { log } from "console";

const Home = async () => {
  const res = await fetch(
    "https://64cc82a52eafdcdc8519e770.mockapi.io/new_products",
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  const products = await res.json();
  console.log(products);

  return (
    <main className="">
      <h1 className="text-3xl font-bold text-center">Products</h1>

      <form action="" className="flex flex-col gap-5 max-w-xl mx-auto p-5">
        <input
          type="text"
          placeholder="Product Name"
          className="border border-gray-300 p-2 rounded-md"
        />

        <input
          type="text"
          placeholder="Price..."
          className="border border-gray-300 p-2 rounded-md"
        />
        <button className="border bg-blue-500 text-white p-2 rounded-md">
          Add Product
        </button>
      </form>

      <h2 className="text-2xl font-bold text-center">List of Products</h2>
      <div className="p-10 flex flex-wrap gap-5">
        {products.map((productt) => (
          <div key={productt.id} className="p-5 shadow">
            <p>{productt.product}</p>
            <p>$ {productt.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
