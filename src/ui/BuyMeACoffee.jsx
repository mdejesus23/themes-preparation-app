import qrcode from '../../public/melqr.jpg';

function BuyMeACoffee() {
  return (
    <div className="bg-gray-100 mx-auto mt-10 flex max-w-md flex-col items-center justify-center rounded-lg p-6 shadow-lg">
      <h1 className="text-gray-800 text-2xl font-bold">Buy Me a Coffee</h1>
      <p className="text-gray-600 mt-2 text-center">
        Support my work by buying me a coffee! Scan the QR code below.
      </p>
      <img
        src={qrcode}
        alt="Buy Me a Coffee QR Code"
        className="border-gray-300 mt-6 w-full rounded-md border"
      />
    </div>
  );
}
export default BuyMeACoffee;
