import "../globals.css";

export default async function LoginLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      {children}
    </div>
  );
}
