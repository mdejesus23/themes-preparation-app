import Modal from '../ui/Modal';
import BuyMeACoffee from './BuyMeACoffee';
import { MdCoffee } from 'react-icons/md';

function Footer() {
  return (
    <footer className="mt-20 w-full py-4 text-center text-neutral-500">
      <div className="mx-auto w-full pt-20">
        <p className="text-sm">
          &copy; {new Date().getFullYear()}{' '}
          {/* <a
            className="hover:text-yellow"
            href="https://melnerdz.com"
            target="_blank"
            rel="noreferrer"
          ></a>{' '} */}
          All trademarks and content belong to their respective owners.
        </p>
        <div>
          <Modal>
            <Modal.Open opens="buy-me-a-coffee">
              <button className="text-gray-400 mx-auto mt-4 flex items-end justify-center gap-2 text-sm transition hover:text-yellow hover:underline">
                Buy me a coffee.
                <MdCoffee size={23} />
              </button>
            </Modal.Open>

            <Modal.Window name="buy-me-a-coffee">
              <BuyMeACoffee />
            </Modal.Window>
          </Modal>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
