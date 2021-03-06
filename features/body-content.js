async function bodyContent(page) { 
  const innerText = await page.evaluate(() => {
    try {
      return Array.from(
        document.querySelectorAll('.main-content-wrapper p'), p => p.innerText)
    } catch (err) {
      console.log(err);
    }
  });
  return innerText;
}

module.exports = bodyContent;