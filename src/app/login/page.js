import Image from "next/image";

export default function Login() {
  return (
    <main
      className="bg-amber-400/70 bg-cover h-screen flex items-center justify-center"
      style={{ backgroundImage: "url(/pexels.jpg)" }}
    >
      <div className="w-[400px]">
        <Image src={"/protek logo.png"} width={410} height={100} />
        <form className="flex flex-col my-4">
          <label for="login-id" className="text-white">
            Admin ID
          </label>
          <input id="login-id" className="p-2 rounded-lg"></input>

          <label for="login-password" className="text-white mt-4">
            Passkey
          </label>
          <input
            id="login-password"
            className="p-2 rounded-lg"
            type="password"
          ></input>
          <button className="mt-8 mb-12 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold p-2 rounded-full">
            SUBMIT
          </button>
        </form>
      </div>
    </main>
  );
}
