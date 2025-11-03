import reactLogo from "./assets/react.svg";
import cn from "./twMerge";
import "./App.css";

function App() {
  return (
    <main>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <section className="bg-red-500 p-10 flex gap-4">
        <h2 className="text-2xl font-bold">Hello World</h2>
        <div className="bg-yellow-500 w-10 h-10" />
        <h2 className="text-2xl font-bold">The box is 2.5rem </h2>
        <div className="bg-yellow-500 w-10 h-10" />
      </section>
      <section className="bg-green-500 p-10 flex gap-4">
        <h2 className="text-2xl font-bold">Hello World</h2>
        <div className="bg-yellow-500 w-[40px] h-[40px]" />
        <h2 className="text-2xl font-bold">The Box is 40px</h2>
        <div className="bg-yellow-500 w-[40px] h-[40px]" />
      </section>
      <section className="bg-blue-500 p-10 flex gap-4">
        <h2 className="text-2xl font-bold">Hello World</h2>
        <div className="bg-yellow-500 w-10 w-[40px] h-[40px]" />
        <h2 className="text-2xl font-bold">The Box is 2.5rem or 40px?</h2>
        <div className="bg-yellow-500 w-[40px] w-10 h-[40px]" />
      </section>

      <section className="bg-blue-500 p-10 flex gap-4 mt-40">
        <h2 className="text-2xl font-bold">Hello World</h2>
        <YellowBox className="w-10" />
        <h2 className="text-2xl font-bold">The Box is 40px</h2>
        <YellowBox />
      </section>
    </main>
  );
}

function YellowBox({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-yellow-500 w-[40px] h-[40px]", className)}
      {...props}
    />
  );
}

export default App;
