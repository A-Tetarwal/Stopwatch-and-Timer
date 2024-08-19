const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Go to the GitHub user's contribution page
  await page.goto('https://github.com/users/A-Tetarwal/contributions', {
    waitUntil: 'networkidle2',
  });

  // Evaluate the page content
  const contributions = await page.evaluate(() => {
    // Get all the contribution day elements
    const days = document.querySelectorAll('.ContributionCalendar-day');
    const contributionData = {};

    // Iterate over each day element
    days.forEach((day) => {
      const date = day.getAttribute('data-date');
      const ariaLabel = day.getAttribute('aria-label') || '';
      let count = 0;

      // Extract the contribution count from aria-label
      if (ariaLabel.includes('contribution')) {
        count = parseInt(ariaLabel.split(' ')[0], 10);
      }

      // Store the date and count in an object
      contributionData[date] = count;
    });

    return contributionData;
  });

  // Log the contribution data
  console.log(contributions);

  // Close the browser
  await browser.close();
})();
