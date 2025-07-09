const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 md:justify-items-center gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">Phenokio</h4>
            <p className="text-xs md:text-base text-gray-400">
              멀리 있어도 걱정 없는
              <br />
              스마트 돌봄 서비스 피노키오
            </p>
            <p className="mt-4 text-xs md:text-base text-gray-400">
              &copy; 2025 Phenokio. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-xs md:text-base text-gray-400 mb-32 md:mb-16">
              <p>이메일: phenokio.team@gmail.com</p>
              <p>연락처: 010-4565-4155</p>
              <p>주소: 서울특별시 마포구 마포대로 89 포스트타워, 12층 1201호</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
