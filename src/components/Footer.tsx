const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 md:justify-items-center gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">Phenokio</h4>
            <p className="text-gray-400">
              멀리 있어도 걱정 없는
              <br />
              스마트 돌봄 서비스 피노키오
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p>이메일: phenokio.team@gmail.com</p>
              <p>연락처: 010-4565-4155</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Phenokio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
