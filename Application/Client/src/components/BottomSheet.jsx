export default function BottomSheet({ setIsOpened, children }) {
  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen animate-fadeInBackground bg-app-lightBlue40 z-50"
      onClick={(e) => {
        setIsOpened(false);
      }}
    >
      <div
        className="absolute bottom-0 bg-white border-t-2 rounded-t-3xl border-app-darkBlue w-full border-b-0 py-8 animate-slideInFromBottom"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-10/12 mx-auto">{children}</div>
      </div>
    </div>
  );
}
