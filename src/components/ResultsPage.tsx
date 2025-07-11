import React, { useEffect, useRef, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { archetypes } from '../data/questions';
import { ResultsPageProps } from '../types';
import { createShareableUrl } from '../utils/tokenUtils';
import './ResultsPage.css';

const ResultsPage: React.FC<ResultsPageProps> = ({ results, onRestart }) => {
  const { sortedArchetypes, allScores } = results;
  const top3 = sortedArchetypes.slice(0, 3);

  // Function to format archetype description with highlighted sections
  const formatArchetypeDescription = (description: string) => {
    const sections = description.split(/(Тіньові сторони|Як проявляється у житті)/);
    
    return sections.map((section, index) => {
      if (section === 'Тіньові сторони' || section === 'Як проявляється у житті') {
        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              backgroundColor: '#e8d5b7',
              color: '#5a4a3a',
              fontWeight: 'bold',
              padding: '4px 12px',
              borderRadius: '8px',
              margin: '8px 0',
              fontSize: '1.1rem',
              border: '2px solid #d4c4a8'
            }}
          >
            {section}
          </span>
        );
      }
      return section;
    });
  };

  // State for copy message
  const [copied, setCopied] = useState(false);
  const [buttonText, setButtonText] = useState('Поділитися результатом');

  // Refs for sequential reveal
  const headerRef = useRef<HTMLDivElement>(null);
  const topCardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const allResultsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blocks = [
      headerRef.current,
      ...topCardsRefs.current,
      descRef.current,
      chartRef.current,
      allResultsRef.current,
      actionsRef.current,
    ];
    blocks.forEach((block, idx) => {
      if (block) {
        setTimeout(() => {
          block.classList.add('visible');
        }, idx * 180);
      }
    });
  }, []);

  // Prepare data for radar chart
  const chartData = Object.entries(allScores).map(([archetype, score]) => ({
    archetype: archetypes[archetype].name,
    score: score,
    fullMark: Math.max(...Object.values(allScores))
  }));

  const handleShare = (): void => {
    const shareUrl = createShareableUrl(results);
    
    // Change button text with animation
    setButtonText('Скопійовано!');
    setCopied(true);
    
    // Reset after animation
    setTimeout(() => {
      setButtonText('Поділитися результатом');
      setCopied(false);
    }, 1800);
    
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl)
        .catch(() => {
          // Fallback to old method if clipboard API fails
          fallbackCopyTextToClipboard(shareUrl);
        });
    } else {
      // Fallback for older browsers
      fallbackCopyTextToClipboard(shareUrl);
    }
  };

  const fallbackCopyTextToClipboard = (text: string): void => {
    // Modern fallback using Clipboard API with writeText
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(err => {
        console.error('Failed to copy: ', err);
      });
      return;
    }
    
    // Last resort: create a temporary element and use selection API
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      // Use the modern selection API instead of execCommand
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(textArea);
      selection?.removeAllRanges();
      selection?.addRange(range);
      
      // Try clipboard API again as fallback
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => {
          console.error('Failed to copy to clipboard');
        });
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
    
    document.body.removeChild(textArea);
  };

  return (
    <div className="results-page" style={{ position: 'relative', overflow: 'hidden' }}>
      <svg className="fern-decor" xmlns="http://www.w3.org/2000/svg" version="1.0" width="420" height="420" viewBox="0 0 1280 1280" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
        <g transform="translate(0,1280) scale(0.1,-0.1)" fill="#f3e8d2" stroke="none">
          <path d="M8844 12463 c-14 -318 -11 -831 4 -953 28 -222 74 -406 154 -607 l40 -102 -26 -198 c-34 -254 -62 -412 -69 -393 -3 8 -10 52 -16 98 -30 232 -123 537 -230 757 -144 295 -316 508 -549 680 -48 36 -90 65 -94 65 -10 0 189 -589 251 -744 141 -351 312 -613 546 -834 l88 -83 -23 -112 c-22 -112 -112 -474 -148 -597 -16 -51 -21 -61 -27 -45 -146 389 -267 603 -490 865 -148 174 -377 350 -588 450 -60 29 -110 50 -113 47 -5 -5 209 -379 314 -547 243 -390 466 -625 781 -825 l89 -57 -14 -51 c-23 -79 -162 -491 -183 -539 l-18 -43 -28 85 c-187 562 -592 1048 -1061 1272 -58 28 -108 48 -111 44 -7 -7 262 -468 364 -626 216 -330 413 -535 698 -723 66 -43 121 -82 123 -86 6 -16 -157 -399 -280 -660 l-54 -115 -23 95 c-90 368 -266 793 -460 1114 -268 442 -592 774 -987 1013 -115 69 -204 115 -210 109 -6 -6 260 -576 396 -847 349 -697 644 -1074 1137 -1447 62 -47 113 -91 113 -97 0 -15 -204 -397 -308 -576 -90 -156 -198 -332 -287 -469 -57 -88 -46 -100 -109 126 -80 285 -182 546 -325 831 -355 707 -870 1250 -1472 1552 -54 28 -101 50 -103 50 -3 0 16 -42 41 -92 25 -51 114 -235 198 -408 256 -531 426 -843 601 -1105 271 -408 582 -728 987 -1017 l97 -70 -77 -111 c-82 -119 -258 -363 -295 -410 l-23 -28 -58 148 c-109 275 -291 622 -457 868 -150 223 -305 411 -500 605 -250 250 -520 450 -814 601 -139 72 -374 174 -382 166 -4 -4 0 -10 306 -502 429 -689 645 -982 960 -1295 229 -229 472 -418 772 -598 l117 -70 -144 -184 c-200 -255 -368 -453 -380 -448 -5 2 -31 61 -56 131 -138 377 -334 759 -546 1061 -199 283 -469 578 -698 762 -152 122 -375 268 -530 348 -143 73 -295 141 -302 134 -5 -5 320 -572 485 -846 305 -509 555 -838 849 -1121 185 -178 452 -383 667 -515 l67 -41 -107 -119 c-164 -182 -307 -334 -315 -334 -3 0 -26 30 -51 67 -58 87 -182 247 -267 343 -545 618 -1209 1040 -1912 1214 -144 36 -379 80 -386 72 -9 -8 679 -637 882 -806 544 -453 1001 -697 1663 -887 l64 -18 -319 -315 c-175 -173 -409 -397 -520 -498 l-202 -183 -71 143 c-136 273 -317 552 -517 798 -108 133 -387 409 -518 514 -281 224 -605 405 -913 511 -154 53 -204 66 -195 52 13 -21 474 -629 552 -727 508 -643 932 -999 1514 -1274 l107 -51 -87 -75 c-49 -41 -168 -142 -266 -224 -169 -141 -180 -148 -204 -137 -31 14 -38 9 -23 -18 6 -12 7 -21 3 -21 -4 0 -24 26 -42 58 -139 230 -432 580 -660 789 -415 379 -820 623 -1301 783 -145 48 -426 120 -470 120 -17 0 573 -600 774 -789 532 -497 951 -762 1530 -966 l118 -42 -113 -90 c-124 -97 -448 -343 -453 -343 -2 0 -33 44 -70 98 -112 167 -273 360 -441 527 -480 481 -1006 773 -1614 899 -69 14 -126 24 -128 22 -5 -4 525 -525 668 -657 492 -452 887 -692 1444 -879 l109 -36 -239 -171 c-132 -93 -260 -183 -285 -200 l-45 -31 -140 142 c-555 561 -1244 931 -1955 1050 -136 23 -399 50 -407 43 -5 -6 576 -426 772 -559 553 -375 984 -566 1545 -683 68 -14 126 -27 127 -29 5 -4 -526 -354 -586 -386 -20 -10 -31 -2 -126 88 -400 382 -857 628 -1338 721 -111 22 -318 46 -337 39 -11 -3 319 -248 540 -400 356 -245 665 -388 1034 -479 65 -16 120 -30 122 -32 8 -8 -715 -428 -924 -537 -45 -23 -81 -44 -79 -46 6 -6 397 178 760 358 185 92 340 167 344 165 4 -1 26 -58 49 -127 148 -441 336 -701 888 -1233 156 -151 216 -203 216 -188 0 11 -9 68 -20 126 -97 502 -472 1008 -1012 1367 l-107 71 175 94 c96 51 244 131 329 179 85 47 157 86 160 87 3 1 24 -52 46 -118 158 -464 399 -836 824 -1275 145 -149 677 -672 681 -668 5 7 -29 202 -51 294 -71 287 -201 571 -383 834 -221 321 -563 657 -925 910 -68 47 -102 77 -94 81 6 4 117 71 246 148 129 78 237 141 240 141 3 0 30 -44 60 -98 250 -448 590 -793 1206 -1224 288 -201 627 -430 631 -425 10 10 -72 222 -136 352 -144 295 -346 551 -635 810 -235 210 -583 438 -897 589 l-128 62 302 199 c165 110 305 201 309 203 4 2 33 -46 64 -106 173 -339 408 -637 755 -957 266 -245 783 -682 788 -666 6 18 -56 258 -94 358 -199 536 -600 1017 -1189 1425 -55 38 -107 74 -115 79 -13 8 -11 12 8 26 13 9 95 70 184 135 88 66 161 118 162 116 25 -42 192 -236 291 -337 352 -361 707 -599 1400 -937 282 -138 785 -374 795 -374 13 0 -96 195 -169 303 -378 555 -1055 1021 -1911 1315 -80 27 -181 60 -225 72 -44 12 -83 24 -87 26 -4 3 70 67 165 143 95 76 212 172 261 214 l90 75 118 -111 c441 -413 897 -670 1718 -969 288 -105 873 -308 877 -305 1 2 -20 36 -47 76 -388 563 -1111 1012 -2035 1266 -171 47 -469 115 -502 115 -11 0 -22 3 -25 6 -4 3 62 67 145 142 84 75 197 181 253 235 56 53 104 97 108 97 4 0 46 -31 94 -69 429 -338 894 -559 1587 -756 305 -87 1254 -320 1263 -310 3 2 -62 71 -144 153 -145 144 -299 269 -454 367 -41 26 -68 45 -60 43 8 -3 85 -31 170 -63 206 -77 1132 -396 1137 -392 1 2 -21 38 -51 80 -439 632 -1245 1125 -2296 1408 -169 45 -507 118 -622 135 -27 3 -48 8 -48 10 0 2 55 68 123 146 67 79 158 187 201 241 43 53 82 97 87 97 5 0 53 -22 107 -49 447 -224 934 -374 1492 -460 402 -62 667 -86 1873 -169 59 -4 107 -5 107 -2 -1 10 -180 135 -282 197 -679 411 -1670 624 -2793 599 -159 -3 -323 -9 -363 -13 l-74 -6 122 164 c102 137 391 558 427 622 9 18 17 15 111 -32 525 -263 1109 -418 1932 -510 343 -39 1369 -125 1417 -119 23 3 15 11 -63 69 -443 330 -1037 559 -1746 674 -381 62 -581 77 -1099 84 l-446 6 69 120 c38 66 96 171 129 233 33 61 64 112 69 112 4 0 86 -20 182 -45 505 -130 912 -183 1468 -192 453 -7 858 14 1495 77 423 43 1150 121 1154 125 5 6 -95 50 -241 106 -827 315 -1961 371 -3233 158 -219 -36 -480 -89 -662 -133 -79 -20 -132 -29 -129 -22 2 6 49 106 104 221 74 158 181 396 197 442 0 1 82 -24 180 -57 583 -190 1071 -250 1925 -236 445 7 1214 37 1225 48 9 9 -195 111 -336 167 -507 202 -1172 295 -1882 263 -357 -17 -754 -60 -1026 -112 -30 -5 -55 -9 -56 -8 -2 2 15 48 36 103 22 55 63 168 91 250 28 83 52 151 54 153 1 2 55 -10 121 -26 431 -109 815 -119 1699 -47 104 8 213 18 243 21 l54 7 -27 14 c-64 33 -231 94 -337 122 -211 56 -501 91 -759 91 -236 0 -601 -37 -845 -84 -66 -13 -121 -23 -122 -22 -1 1 16 62 38 136 22 74 54 189 71 255 17 66 32 121 33 123 1 1 56 -13 121 -32 448 -128 832 -147 1664 -81 173 14 339 28 369 31 l55 7 -55 27 c-139 71 -402 142 -650 177 -173 24 -642 24 -857 0 -174 -20 -403 -57 -540 -88 -51 -11 -95 -19 -97 -17 -2 1 14 84 36 183 21 99 39 187 39 196 0 12 33 21 159 43 524 89 885 225 1871 705 l165 80 -85 0 c-92 1 -275 -19 -411 -45 -480 -90 -1108 -347 -1603 -657 l-79 -49 6 39 c36 248 57 398 62 444 l6 57 82 12 c549 79 1008 249 1997 740 l145 72 -130 -6 c-568 -25 -1329 -299 -1994 -718 -51 -32 -94 -58 -95 -56 -1 2 3 54 9 117 l10 114 153 63 c378 155 697 336 1098 624 147 106 751 568 759 580 7 11 -141 -29 -255 -68 -534 -183 -1113 -548 -1638 -1030 l-113 -104 4 258 c3 215 7 283 27 399 22 127 24 169 24 450 1 332 -5 394 -59 607 -34 132 -68 225 -125 340 -43 85 -124 218 -134 218 -2 0 -8 -93 -12 -207z m-1684 -7766 c144 -116 346 -255 472 -327 43 -24 76 -45 75 -46 -1 -2 -54 13 -117 32 -356 109 -838 203 -1165 229 -156 12 -158 -6 27 183 90 92 192 199 227 239 l64 72 141 -137 c78 -75 202 -186 276 -245z"/>
        </g>
      </svg>
      {/* Top left fern image */}
      <svg className="fern-top-left" xmlns="http://www.w3.org/2000/svg" version="1.0" width="420" height="420" viewBox="0 0 1280 1280" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
        <g transform="translate(0,1280) scale(0.1,-0.1)" fill="#f3e8d2" stroke="none">
          <path d="M8844 12463 c-14 -318 -11 -831 4 -953 28 -222 74 -406 154 -607 l40 -102 -26 -198 c-34 -254 -62 -412 -69 -393 -3 8 -10 52 -16 98 -30 232 -123 537 -230 757 -144 295 -316 508 -549 680 -48 36 -90 65 -94 65 -10 0 189 -589 251 -744 141 -351 312 -613 546 -834 l88 -83 -23 -112 c-22 -112 -112 -474 -148 -597 -16 -51 -21 -61 -27 -45 -146 389 -267 603 -490 865 -148 174 -377 350 -588 450 -60 29 -110 50 -113 47 -5 -5 209 -379 314 -547 243 -390 466 -625 781 -825 l89 -57 -14 -51 c-23 -79 -162 -491 -183 -539 l-18 -43 -28 85 c-187 562 -592 1048 -1061 1272 -58 28 -108 48 -111 44 -7 -7 262 -468 364 -626 216 -330 413 -535 698 -723 66 -43 121 -82 123 -86 6 -16 -157 -399 -280 -660 l-54 -115 -23 95 c-90 368 -266 793 -460 1114 -268 442 -592 774 -987 1013 -115 69 -204 115 -210 109 -6 -6 260 -576 396 -847 349 -697 644 -1074 1137 -1447 62 -47 113 -91 113 -97 0 -15 -204 -397 -308 -576 -90 -156 -198 -332 -287 -469 -57 -88 -46 -100 -109 126 -80 285 -182 546 -325 831 -355 707 -870 1250 -1472 1552 -54 28 -101 50 -103 50 -3 0 16 -42 41 -92 25 -51 114 -235 198 -408 256 -531 426 -843 601 -1105 271 -408 582 -728 987 -1017 l97 -70 -77 -111 c-82 -119 -258 -363 -295 -410 l-23 -28 -58 148 c-109 275 -291 622 -457 868 -150 223 -305 411 -500 605 -250 250 -520 450 -814 601 -139 72 -374 174 -382 166 -4 -4 0 -10 306 -502 429 -689 645 -982 960 -1295 229 -229 472 -418 772 -598 l117 -70 -144 -184 c-200 -255 -368 -453 -380 -448 -5 2 -31 61 -56 131 -138 377 -334 759 -546 1061 -199 283 -469 578 -698 762 -152 122 -375 268 -530 348 -143 73 -295 141 -302 134 -5 -5 320 -572 485 -846 305 -509 555 -838 849 -1121 185 -178 452 -383 667 -515 l67 -41 -107 -119 c-164 -182 -307 -334 -315 -334 -3 0 -26 30 -51 67 -58 87 -182 247 -267 343 -545 618 -1209 1040 -1912 1214 -144 36 -379 80 -386 72 -9 -8 679 -637 882 -806 544 -453 1001 -697 1663 -887 l64 -18 -319 -315 c-175 -173 -409 -397 -520 -498 l-202 -183 -71 143 c-136 273 -317 552 -517 798 -108 133 -387 409 -518 514 -281 224 -605 405 -913 511 -154 53 -204 66 -195 52 13 -21 474 -629 552 -727 508 -643 932 -999 1514 -1274 l107 -51 -87 -75 c-49 -41 -168 -142 -266 -224 -169 -141 -180 -148 -204 -137 -31 14 -38 9 -23 -18 6 -12 7 -21 3 -21 -4 0 -24 26 -42 58 -139 230 -432 580 -660 789 -415 379 -820 623 -1301 783 -145 48 -426 120 -470 120 -17 0 573 -600 774 -789 532 -497 951 -762 1530 -966 l118 -42 -113 -90 c-124 -97 -448 -343 -453 -343 -2 0 -33 44 -70 98 -112 167 -273 360 -441 527 -480 481 -1006 773 -1614 899 -69 14 -126 24 -128 22 -5 -4 525 -525 668 -657 492 -452 887 -692 1444 -879 l109 -36 -239 -171 c-132 -93 -260 -183 -285 -200 l-45 -31 -140 142 c-555 561 -1244 931 -1955 1050 -136 23 -399 50 -407 43 -5 -6 576 -426 772 -559 553 -375 984 -566 1545 -683 68 -14 126 -27 127 -29 5 -4 -526 -354 -586 -386 -20 -10 -31 -2 -126 88 -400 382 -857 628 -1338 721 -111 22 -318 46 -337 39 -11 -3 319 -248 540 -400 356 -245 665 -388 1034 -479 65 -16 120 -30 122 -32 8 -8 -715 -428 -924 -537 -45 -23 -81 -44 -79 -46 6 -6 397 178 760 358 185 92 340 167 344 165 4 -1 26 -58 49 -127 148 -441 336 -701 888 -1233 156 -151 216 -203 216 -188 0 11 -9 68 -20 126 -97 502 -472 1008 -1012 1367 l-107 71 175 94 c96 51 244 131 329 179 85 47 157 86 160 87 3 1 24 -52 46 -118 158 -464 399 -836 824 -1275 145 -149 677 -672 681 -668 5 7 -29 202 -51 294 -71 287 -201 571 -383 834 -221 321 -563 657 -925 910 -68 47 -102 77 -94 81 6 4 117 71 246 148 129 78 237 141 240 141 3 0 30 -44 60 -98 250 -448 590 -793 1206 -1224 288 -201 627 -430 631 -425 10 10 -72 222 -136 352 -144 295 -346 551 -635 810 -235 210 -583 438 -897 589 l-128 62 302 199 c165 110 305 201 309 203 4 2 33 -46 64 -106 173 -339 408 -637 755 -957 266 -245 783 -682 788 -666 6 18 -56 258 -94 358 -199 536 -600 1017 -1189 1425 -55 38 -107 74 -115 79 -13 8 -11 12 8 26 13 9 95 70 184 135 88 66 161 118 162 116 25 -42 192 -236 291 -337 352 -361 707 -599 1400 -937 282 -138 785 -374 795 -374 13 0 -96 195 -169 303 -378 555 -1055 1021 -1911 1315 -80 27 -181 60 -225 72 -44 12 -83 24 -87 26 -4 3 70 67 165 143 95 76 212 172 261 214 l90 75 118 -111 c441 -413 897 -670 1718 -969 288 -105 873 -308 877 -305 1 2 -20 36 -47 76 -388 563 -1111 1012 -2035 1266 -171 47 -469 115 -502 115 -11 0 -22 3 -25 6 -4 3 62 67 145 142 84 75 197 181 253 235 56 53 104 97 108 97 4 0 46 -31 94 -69 429 -338 894 -559 1587 -756 305 -87 1254 -320 1263 -310 3 2 -62 71 -144 153 -145 144 -299 269 -454 367 -41 26 -68 45 -60 43 8 -3 85 -31 170 -63 206 -77 1132 -396 1137 -392 1 2 -21 38 -51 80 -439 632 -1245 1125 -2296 1408 -169 45 -507 118 -622 135 -27 3 -48 8 -48 10 0 2 55 68 123 146 67 79 158 187 201 241 43 53 82 97 87 97 5 0 53 -22 107 -49 447 -224 934 -374 1492 -460 402 -62 667 -86 1873 -169 59 -4 107 -5 107 -2 -1 10 -180 135 -282 197 -679 411 -1670 624 -2793 599 -159 -3 -323 -9 -363 -13 l-74 -6 122 164 c102 137 391 558 427 622 9 18 17 15 111 -32 525 -263 1109 -418 1932 -510 343 -39 1369 -125 1417 -119 23 3 15 11 -63 69 -443 330 -1037 559 -1746 674 -381 62 -581 77 -1099 84 l-446 6 69 120 c38 66 96 171 129 233 33 61 64 112 69 112 4 0 86 -20 182 -45 505 -130 912 -183 1468 -192 453 -7 858 14 1495 77 423 43 1150 121 1154 125 5 6 -95 50 -241 106 -827 315 -1961 371 -3233 158 -219 -36 -480 -89 -662 -133 -79 -20 -132 -29 -129 -22 2 6 49 106 104 221 74 158 181 396 197 442 0 1 82 -24 180 -57 583 -190 1071 -250 1925 -236 445 7 1214 37 1225 48 9 9 -195 111 -336 167 -507 202 -1172 295 -1882 263 -357 -17 -754 -60 -1026 -112 -30 -5 -55 -9 -56 -8 -2 2 15 48 36 103 22 55 63 168 91 250 28 83 52 151 54 153 1 2 55 -10 121 -26 431 -109 815 -119 1699 -47 104 8 213 18 243 21 l54 7 -27 14 c-64 33 -231 94 -337 122 -211 56 -501 91 -759 91 -236 0 -601 -37 -845 -84 -66 -13 -121 -23 -122 -22 -1 1 16 62 38 136 22 74 54 189 71 255 17 66 32 121 33 123 1 1 56 -13 121 -32 448 -128 832 -147 1664 -81 173 14 339 28 369 31 l55 7 -55 27 c-139 71 -402 142 -650 177 -173 24 -642 24 -857 0 -174 -20 -403 -57 -540 -88 -51 -11 -95 -19 -97 -17 -2 1 14 84 36 183 21 99 39 187 39 196 0 12 33 21 159 43 524 89 885 225 1871 705 l165 80 -85 0 c-92 1 -275 -19 -411 -45 -480 -90 -1108 -347 -1603 -657 l-79 -49 6 39 c36 248 57 398 62 444 l6 57 82 12 c549 79 1008 249 1997 740 l145 72 -130 -6 c-568 -25 -1329 -299 -1994 -718 -51 -32 -94 -58 -95 -56 -1 2 3 54 9 117 l10 114 153 63 c378 155 697 336 1098 624 147 106 751 568 759 580 7 11 -141 -29 -255 -68 -534 -183 -1113 -548 -1638 -1030 l-113 -104 4 258 c3 215 7 283 27 399 22 127 24 169 24 450 1 332 -5 394 -59 607 -34 132 -68 225 -125 340 -43 85 -124 218 -134 218 -2 0 -8 -93 -12 -207z m-1684 -7766 c144 -116 346 -255 472 -327 43 -24 76 -45 75 -46 -1 -2 -54 13 -117 32 -356 109 -838 203 -1165 229 -156 12 -158 -6 27 183 90 92 192 199 227 239 l64 72 141 -137 c78 -75 202 -186 276 -245z"/>
        </g>
      </svg>
      <div ref={headerRef} className="results-header scroll-reveal">
        <h1>
          <span className="decorative-a">A</span>рхетипи: Твій результат
        </h1>
        <p className="results-subtitle">Топ-3 архетипи, які найбільше проявлені у твоїй особистості</p>
      </div>

      <div className="primary-result" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        {top3.map((item, idx) => {
          const data = archetypes[item.archetype];
          return (
            <div
              className="archetype-card scroll-reveal"
              key={item.archetype}
              ref={el => { topCardsRefs.current[idx] = el; }}
              style={{ maxWidth: 320, minWidth: 240, textAlign: 'center', position: 'relative', zIndex: 1 }}
            >
              <img
                src={`/${item.archetype}.PNG`}
                alt={data.name}
                style={{ width: 120, height: 120, objectFit: 'cover', objectPosition: 'top', borderRadius: '50%', marginBottom: 16, background: '#e6e2d3', boxShadow: '0 4px 16px rgba(67,81,58,0.10)' }}
                loading="lazy"
              />
              <h2 style={{ fontWeight: 700, fontSize: '1.4rem', margin: '0 0 8px 0', color: '#43513a' }}>{data.name}</h2>
              <div style={{ fontWeight: 600, color: '#7e8d6f', marginBottom: 8 }}>{item.score} балів</div>
              <div style={{ fontSize: '1rem', color: '#43513a', marginBottom: 12 }}>{data.description}</div>
              <div style={{ fontSize: '0.95rem', color: '#7e8d6f' }}>
                <b>Ключові якості:</b> {data.traits.join(', ')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Full description for the top archetype */}
      <div ref={descRef} className="top-archetype-description scroll-reveal" style={{ background: '#f3e8d2', color: '#43513a', borderRadius: 24, padding: 32, margin: '40px auto 24px auto', maxWidth: 1000, boxShadow: '0 4px 24px rgba(67,81,58,0.10)', fontSize: '1.08rem', lineHeight: 1.7 }}>
        <h2 style={{ color: '#7b8c6a', fontWeight: 800, fontSize: '1.5rem', marginBottom: 18, textAlign: 'center' }}>
          {archetypes[top3[0].archetype].name}: повний опис
        </h2>
        <div style={{ whiteSpace: 'pre-line' }}>
          {formatArchetypeDescription(archetypes[top3[0].archetype].fullDescription)}
        </div>
      </div>

      <div ref={chartRef} className="chart-section scroll-reveal">
        <h3>Профіль архетипів</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={chartData}>
              <PolarGrid />
              <PolarAngleAxis 
                dataKey="archetype" 
                tick={{ fontSize: 12, fill: '#43513a' }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, Math.max(...Object.values(allScores))]}
                tick={{ fontSize: 10, fill: '#7e8d6f' }}
              />
              <Radar
                name="Твій профіль"
                dataKey="score"
                stroke="#7e8d6f"
                fill="#a3b18a"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div ref={allResultsRef} className="all-results scroll-reveal">
        <h3>Всі архетипи (за рейтингом)</h3>
        <div className="results-list">
          {results.sortedArchetypes.map((item, index) => (
            <div key={item.archetype} className="result-item">
              <div className="result-rank">#{index + 1}</div>
              <div className="result-info">
                <div className="result-name">{archetypes[item.archetype].name}</div>
                <div className="result-score">{item.score} балів</div>
              </div>
              <div className="result-bar">
                <div 
                  className="result-fill" 
                  style={{ 
                    width: `${(item.score / Math.max(...Object.values(allScores))) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div ref={actionsRef} className="results-actions scroll-reveal">
        <button className="restart-button" onClick={onRestart}>
          Пройти тест ще раз
        </button>
        <button 
          className={`share-button ${copied ? 'copied' : ''}`} 
          onClick={handleShare}
          disabled={copied}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ResultsPage; 