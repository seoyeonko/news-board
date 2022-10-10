export function createSipinner(parent) {
  // 로딩 이미지를 추가할 DOM 요소 선택
  const spinnerAreaEl = parent.querySelector('.spinner-area');
  // img 태그 생성 -> spinner.gif 짤 추가
  const imageEl = document.createElement('img');
  imageEl.alt = 'spinner';
  imageEl.src = './src/image/spinner.gif';

  spinnerAreaEl.append(imageEl);
}
