const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white pt-12 pb-36 sm:pb-28 lg:pb-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 md:justify-items-center gap-8">
          <div>
            <h4 className="text-lg font-bold">Phenokio</h4>
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
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-2 text-xs md:text-base text-gray-400 mb-8">
              <p>이메일: phenokio.team@gmail.com</p>
              <p>연락처: 010-4565-4155</p>
              <p>주소: 서울특별시 마포구 마포대로 89 포스트타워, 12층</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 text-xs md:text-sm">
          <a
            href="https://expensive-column-9a7.notion.site/2462dd8ca26280188094c121ebec4e44"
            className="text-gray-400 hover:text-white"
          >
            이용약관
          </a>
          <span className="text-zinc-700">|</span>
          <a
            href="https://expensive-column-9a7.notion.site/2462dd8ca2628006867ff303cdc70642"
            className="text-gray-400 hover:text-white"
          >
            개인정보처리방침
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
