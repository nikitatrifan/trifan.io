import Script from "next/script";

export default function Head() {
  return (
    <>
      {/*<!-- Analytics -->*/}
      {process.env.NODE_ENV === "production" && (
        <>
          {/*<Script id="google-tag" strategy="afterInteractive">*/}
          {/*  {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NJM64WS');`}*/}
          {/*</Script>*/}
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-8T50QWQ86M"
          />
          <Script id="google-analytics">
            {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-S06JXQL96Z');`}
          </Script>
          <Script id="hotjar" strategy="lazyOnload">
            {`(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:3433445,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
          </Script>
          <Script id="crisp" strategy="lazyOnload">
            {`window.$crisp=[];window.CRISP_WEBSITE_ID="41b63673-458a-4b8f-ac59-cdc80ad50f99";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}
          </Script>
          <Script id="twitter-pixel" strategy="lazyOnload">
            {`!function(e,t,n,s,c,a){e.twq||((s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments)}).version="1.1",s.queue=[],(c=t.createElement(n)).async=!0,c.src="https://static.ads-twitter.com/uwt.js",(a=t.getElementsByTagName(n)[0]).parentNode.insertBefore(c,a))}(window,document,"script"),twq("config","oeg7b");`}
          </Script>
          <Script id="fb-pixel" strategy="lazyOnload">
            {`!function(e,t,n,c,o,a,f){e.fbq||(o=e.fbq=function(){o.callMethod?o.callMethod.apply(o,arguments):o.queue.push(arguments)},e._fbq||(e._fbq=o),o.push=o,o.loaded=!0,o.version="2.0",o.queue=[],(a=t.createElement(n)).async=!0,a.src="https://connect.facebook.net/en_US/fbevents.js",(f=t.getElementsByTagName(n)[0]).parentNode.insertBefore(a,f))}(window,document,"script"),fbq("init","614066747241822"),fbq("track","PageView");`}
          </Script>

          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              alt=""
              style={{ display: "block" }}
              src="https://www.facebook.com/tr?id=614066747241822&ev=PageView&noscript=1"
            />
          </noscript>
        </>
      )}

      <title>Trifan.io</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta
        name="description"
        content="Pushing world class further down the line"
      />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
