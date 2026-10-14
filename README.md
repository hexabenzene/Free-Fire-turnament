# Free Fire Tournament Leaderboard

## GitHub Pages-এ চালানো

1. GitHub-এ নতুন repository তৈরি করুন।
2. এই 3টি ফাইল (`index.html`, `style.css`, `script.js`) repository-তে upload করুন।
3. Repository → Settings → Pages → Deploy from branch নির্বাচন করুন।
4. Branch হিসেবে `main` এবং folder হিসেবে `/root` নির্বাচন করে Save করুন।
5. কিছুক্ষণ পর GitHub Pages-এর URL পাবেন।

## গুরুত্বপূর্ণ

এটি প্রথম MVP/demo। ডেটা `localStorage`-এ থাকে, তাই অন্য ফোন/ব্রাউজার থেকে একই leaderboard দেখা যাবে না।

পরের ধাপে Firebase যোগ করলে:
- সব ডিভাইসে একই live data
- Admin login
- আলাদা match link
- real-time leaderboard
- public/private access
যোগ করা যাবে।
