import styled from 'styled-components';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import BookmarkEmpty from './BookmarkEmpty';
import { toastState } from '../../recoil';
import { putBookmark, getBookmarkFeedList } from '../../apis/bookmark/bookmark';
import { Button, Checkbox } from '../../components';
import BookmarkFeedItem from './BookmarkFeedItem';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const FeedItemWrapper = styled.li`
  display: flex;
  /* border-bottom: 1px solid ${({ theme }) => theme.borderColor}; */
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & :first-child {
    margin-bottom: 0.5rem;
  }
`;

const Btn = styled(Button)<{ checked: boolean }>``;

const MBookmarkFeedList = [
  {
    id: 12853,
    feedId: 'P8x1NIYBAWExQKiWa9_K',
    title: 'Useful Style-related Features Of Browser Devel  materials for debugging JavaS',
    content:
      "Useful Style-related Features Of Browser Developer Tools to Explore in 2021 Introduction When you're doing web front-end development, you can easily find materials for debugging JavaScript or app performance. For example, even our FE development team wrote a document on how to debug JavaScript. When debugging CSS (Cascading Style Sheets), you can easily find the basic usage of developer tools, but there are so many features that you will only use the ones you use frequently, unless you look closely. The browser's developer tools are also a piece of software that evolves gradually, so useful features have been deployed while we didn't realize. In addition, there are cases where useful features are overlooked and not utilized properly even when they have already been implemented. This article introduces useful features when debugging CSS in developer tools in multiple browsers and how to use them. According to the last year's State of CSS survey, front-end developers use Chrome browser the most. Considering that, this article introduces features mainly based on the developer tools of Chrome browser. We will also look at the developer tools of Firefox and Edge browsers as well as those of Chrome browser, focusing on some of the differentiating features. Unfortunately, we could not find a differentiating feature of Safari to introduce in relation to CSS. Note The browser versions examined at the time of writing are as follows. Flexbox Debugging Tools (Chrome, Firefox) Since the Flexbox specification came out in 2009, arranging layout of DOM elements has become much easier. However, declaring in the container directly affects the immediate child elements, and it may cause unintended layout issues because the browser automatically adjusts the layout according to the properties defined by developers. Each time when such an issue occurs, we had to change the element's properties one by one in the Styles panel of the developer tools and check how the position of the element affected by Flexbox changed in a less intuitive way. Starting with Firefox's Flexbox Inspector, Flexbox Debugging Tool has been applied also to the Chrome developer tools from February this year. [Chrome's Flexbox tools 1] Elements with or applied are marked with a badge in the Elements panel. This badge not only tells you that it's a Flexbox container, but also shows the area actually occupied by the child elements of that area when you click on the badge. [Chrome's Flexbox tools 2] You can also apply various alignment properties without manually entering properties in the Styles panel. [Firefox's Flexbox tools 1] Firefox developer tools offers even more advanced features. In addition to the features provided by Chrome, you can see a list of child elements contained in that Flexbox container in the Layout panel. [Firefox's Flexbox tools 2] And if you click on a child element in the list shown above, you can see more detailed information, along with applied properties, and even the actual computed size. Grid Debugging Tools (Chrome, Firefox) CSS Grid has become available in major browsers since 2017, much later than Flexbox. When comparing Flexbox and Grid, one of the biggest difference is that Flexbox can define the layout over only one dimension divided by rows or columns, whereas Grid can define both rows and columns at the same time. So it is very helpful if you can get visual feedback on how each element occupies an area by modifying the layout with the developer tools. [Chrome's Grid tools 1] As with the Flexbox tools, an element with the or property applied has a badge named . Clicking on that badge reveals an overlay layer that shows how the grid is positioned. You can configure settings to view more detailed information in the Layout tab. You can see the size of the track directly, or if you have assigned a name to a specific area, you can also see the name. [Chrome's Grid tools 2] Flexbox and Grid in common provide UI to view all Flexbox and Grid containers of the page you are currently viewing and display overlays. But it may be difficult to tell where the element is located, so it might be better to check the overlays by pressing the or badge directly in the elements panel. [Firefox's Grid tools] Firefox's Grid tools displays more information than Chrome's Grid tools, and the one that stands out among them is the mini layout overlay area. If you check the Grid container for which you want to check the overlay in the Layout panel, you can see the overlay of the container on a small screen, and you can immediately see how it is displayed by moving the mouse to each cell. Font Tools (Firefox) Typography is one of the important elements that make up the style of websites and applications. However, the task of changing the font of the website you're developing was merely changing the numerical value without the support of any tools. Starting with Firefox 63, there is a tool that allows you to change the font as you like in the Elements tab of the developer tools. You can also use this tool to see at a glance which fonts are currently used on your website. Other browsers also let you check which font family is currently being used, but only Firefox provides a tool to change fonts with a more intuitive interface. [Firefox's Font tools 1] If you select a specific element in developer tools and open the Fonts tab, you can see at a glance which font has been applied and which font is being used throughout the page as shown above. In addition, you can check immediately how the result is displayed by directly applying the font size, weight, and spacing, and so on. In other developer tools, you have to find and change properties or manually set properties, but the Font tools are useful because you can adjust properties much more intuitively. [Firefox's Font tools 2] If variable fonts have been applied to the website, there are more items that can be edited in the Font editor. You can adjust the variation axes as you want, or apply the instances predefined by the font designer. CSS Overview (Chrome) This tool lets you check colors, fonts, and media queries used in the page you're developing as well as unused CSS declarations. Since this is an experimental feature scheduled to be applied to Chrome 96, you must open the developer tools settings and enable the experimental feature to use it in Chrome 95. After that, select the 'Show CSS Overview' menu from the command palette, which can be run with , to load the command. [Setting up CSS Overview] If you click the 'Capture Overview' button in the CSS Overview panel, the information of key CSS properties applied in the page is displayed soon. [Information displayed in CSS Overview 1] Not only does it display the number of defined styles, but if you click the number of times being used, you can immediately check which elements are using the style and move to one of the elements. [Information displayed in CSS Overview 2] Since CSS Overview is still an experimental feature collecting feedback from developers, it is expected that the feature will be developed so that more useful information can be viewed at once in the future. Explore Code Coverage (Chrome) When developing applications larger than a certain scale, style sheets that were written previously and no longer used may be left unattended as the style sheets are changed. Moreover, it is difficult to check whether the style is actually being used one by one. Using the Coverage tab provided by Chrome's developer tools, you can check the coverage of CSS as well as JavaScript code to see which styles are being used and which styles are not. To activate the Coverage tab, open the command palette by typing in developer tools, then select the 'Show Coverage' menu. [Opening Chrome's Coverage tab] After that, press the Reload button and wait until all JS and CSS are loaded, and you can check the coverage information of the JS and CSS files used in the page. In 'Unused Bytes', the percentage of unused code is displayed. [Coverage inspection results] To check which part is not used, click the file and the Source tab of the developer tool will be activated, showing the the source code. The used code is displayed in cyan () and unused code is displayed in red (). [Check coverage] Debugging Stacking Contexts (Edge, Safari) If you apply the property carelessly when composing various UI components while creating a web application, you may experience difficulties because elements are not rendered in the intended location. In such cases, to see how the stacking contexts are structured, you have to look at the associated styles of each element and imagine the 3D space in your head. As the application becomes more complex and the number of elements grows, it becomes more difficult to debug. So, there is a browser extension available that facilitates debugging of stacking contexts. But its visibility is poor and it cannot completely cover all situations. However, Edge and Safari provide a good tool for debugging stacking contexts separately. Just like Chrome's Coverage tool, Edge's 3D View tool can run from the command palette, which can be launched with . You can intuitively see how the value is displayed and what layer hierarchy each element has depending on the stacking context. [Edge's 3D View - z-index] Clicking on the 'DOM' tab shows how the entire DOM structure is layered, not just considering the attribute. [Edge's 3D View - DOM] The 'Composited Layers' tab is not directly related to the stacking context, but it is a tool that helps you view and select elements that make up separate layers within the page at a glance. Safari also provides a similar feature, but the overall interface was inconvenient and difficult to use. [Edge 3D View - Composited Layers] Other Small But Useful Features View CSS Properties Grouped In Computed Tab (Chrome) When writing CSS, there are various opinions in determining the order in which to list properties. There are also opinions that it should be written in alphabetical order of properties, or that meaningful properties should be grouped together, although groups are not explicitly classified in the CSS specification. So, there is even Stylelint configuration that recommends dividing properties by group. When you open the Computed tab in Chrome's developer tools and look at the properties of the element you are currently viewing, the tab also provides a feature to viewing properties by group. If you enable the option, the tab displays properties by grouping them into Layout, Text, Appearance, and Other. [Apply property grouping in the Computed tab] Preview CSS Applied When Printing Web Pages (Chrome, Firefox, Safari) If the website you are developing needs to be printed, you may need to apply the media query. You can change the media type arbitrarily in the developer tools so that you can see the result easily. In Firefox and Safari, you can easily set the media type to by clicking the print icon in the developer tools toolbar. [Firefox's Apply Media Type button] [Safari's Apply Media Type button] However, in Chrome, you need to open a separate 'Rendering' tab to change the media type. [Change Media Type in Chrome developer tools] Closing In addition to these, you will find many developer tools and extensions to supplement the features of the developer tools. In general, you can debug CSS debugging convenient by using only Chrome, but I expect that you will be able to feel the new value of other browser developer tools by using Firefox when editing Flexbox or Grid layout, or by using Edge browser to solve stacking context problems. Most of the debugging tools related to network, performance, and JavaScript also have decent features. But the popular Visual Studio Code appears to be well integrated with the developer tools of Edge browser, so it is worth noting how the developer tools of the Edge browser will evolve differently from those of Chrome. Lastly, if you want to know more about how to use Chrome developer tools in more detail, please refer to 'Gentle Walkthrough of Chrome DevTools' presented at FORWARD in 2020 (note that only Korean and Japanese subtitles are provided).",
    createdAt: '2021-12-06',
    companyName: 'TOAST_UI',
    tags: ['devtool', 'css'],
    url: 'https://ui.toast.com/weekly-pick/en_20211206',
    keywords: [
      'demo',
      'gc',
      '단점',
      '컴퓨팅',
      'beta',
      'software',
      'streams',
      '베타',
      '소프트웨어',
      '컴파일러',
    ],
    logoSrc: 'https://ui.toast.com/icons-afac2d19e8aa82377b3f18a704d4acf5/favicon.ico',
  },
  {
    id: 12854,
    feedId: 'QMx1NIYBAWExQKiWa9_K',
    title: 'crossplane으로 S3를 배포하고 Thanos에서 사용하기',
    content:
      "Thanos는 주요 특징중 하나로 무한 데이터 저장(Unlimited Retention)을 이야기하고 있고 이것은 무한대로 사용 가능한 public cloud를 사용함으로 가능하다. Thanos관련 상세한 내용은 이전블로그(https://devocean.sk.com/blog/techBoardDetail.do?ID=163458)를 참조하자. 앞 블로그에서는 minio를 내부에 구축하여 사용하는 예시를 보여주었고 이에 따라 무한 데이터 저장의 이점을 사용할 수 없다. 따라서 본 블로그에서는 아마존의 S3를 연동하여 실제 데이터를 저장하는 방법을 설명하고 이를 자동화 하는 방법까지 제시할 것이다. S3? Amazon S3는 Amazon Simple Storage Service의 약자(s가 3개)로 이름 그대로 단순 스토리지 서비스이다. 웹통신으로 데이터를 저장하고 검색할 수 있도록 해주는 서비스로 Object storage로 가장 먼저 시작되었고 가장 많이 사용되는 서비스로 표준화된 인터페이스를 제공하고 있다. 사용자는 s3를 사용하여 용량의 제약없이 데이터를 저장하고 다양한 어플리케이션에서 연동할 수 있다. 출처. aws s3 Thanos에서는 다양한 개체저장소(object storage)를 지원하고 s3에 대한 지원도 잘 되고 있다. crosplane을 통한 S3 배포 팀내에서는 aws 자원에 대한 배포의 표준으로 corssplane를 사용하고 있다. crossplane에 대한 자세한 내용은 다음 블로그(https://devocean.sk.com/blog/techBoardDetail.do?ID=163431)를 참조하자. corssplane에서는 s3와 관련하여 다음 두가지 자원을 정의하고 있다. BucketPolicy (https://doc.crds.dev/github.com/crossplane/provider-aws/s3.aws.crossplane.io/BucketPolicy/v1alpha3@v0.21.1) Bucket (https://doc.crds.dev/github.com/crossplane/provider-aws/s3.aws.crossplane.io/Bucket/v1beta1@v0.21.1) Bucket가 s3의 bucket에 대한 crud 및 기본 설정을 할 수 있다. BucketPolicy는 s3에 대한 세부적인 접근규칙 등을 지정할 수 있는데 이에 대한 상세는 aws의 공식문서(using Amazon S3 Block Public Access)를 참조하자. 본 블로그에서는 bucket의 기본 권한만으로 생성하고 thnos 컴포넌트들은 위에서 만든 계정(s3-only)을 통해서만 접근하도록 설정할 것이다. 전용 계정생성 권한이 있는 어떤 계정을 사용해도 되지만 보안을 위해 s3에만 접속가능하도록 전용 계정을 만들어서 사용하자. 아래와 같이 AmazonS3FullAccess 권한을 주고 계정을 생성하자. bucket 생성 다음과 같이 CR을 생성하면 crossplane을 사용하여 bucket을 생성하고 관리할 수 있다. 이 객체가 사라지더라도 bucket을 유지시켜 데이터 유실을 막을 수 있도록 하려면 삭제 정책(deleteionPolicy)은 Orphan으로 지정하자. 생성위치(locationConstraint)는 서울(ap-northeast-2)로 지정했다. 생성이 완료되면 bucket관련 정보를 'writeConnectionSecretRef'으로 지정한 secret에 저장한다. 이제 bucket을 만들어보자. 위 자원이 생성되면 수초후 aws에서 지정한 s3를 확인할 수 있다. 참고. 이미 있는 bucket을 crossplane에 연결하는 방법 기존에 만들어진 버켓을 crossplane으로 관리하려면 다음과 같이 CR을 생성한다. 여기서 가장 중요한 필드는 metadata.anntations.crossplane.io/external-name 이다. 여기에 s3의 bucket 이름을 지정하자. Thanos에서 사용하기 이를 사용하도록 설정을 생성하자. 실행 전 환경에 $AWS_ACCESS_KEY와 $AWS_SECRET_KEY가 설정되어 있어야 한다. 앞에서 만든 전용 계정을 사용하는 것을 권장한다. bucket에 대한 값은 앞에서 만든 버킷명(my-s3-bucket-blog)을 사용하도록 한다. 이후 Thanos블로그(https://devocean.sk.com/blog/techBoardDetail.do?ID=163458)의 내용을 수행하면 minio가 아닌 앞에서 만들어진 S3를 사용하여 매트릭 데이터를 저장하는 것을 확인할 수 있다. 마치며 본 블로그에서는 Thanos를 상용환경에서 운영하기 위해 aws의 S3를 사용하도록 연결하는 방법에 대해 설명하였다. 여기서는 하나의 bucket을 만들고 연결하는 방법을 소개했지만 실제 사용시에는 다수의 bucket을 만들고 bucket별 데이터 저장하는 방법으로도 사용할 수 있다. 이를 위해서는 Thanos의 다른 컴포넌트들에 대한 설계 및 설정이 필요하다. 다음 블로그는 이를 활용하는 구체적인 설계 포인트들을 기술할 예정이다.",
    createdAt: '2021-12-01',
    companyName: '데보션',
    tags: ['prometheus', 'open infra', 'amazon web service'],
    url: 'https://devocean.sk.com/blog/techBoardDetail.do?ID=163508',
    keywords: [
      '소프트웨어',
      '릭스',
      'dl',
      '열정',
      '우테',
      '프록시',
      '데이터베이스',
      '리포',
      '오라클',
      'let',
    ],
    logoSrc: 'https://devocean.sk.com/resource/images/external/logo/logo_favicon.ico',
  },
  {
    id: 12855,
    feedId: 'Qcx1NIYBAWExQKiWa9_K',
    title: '개발 역량 장착하기(5)-마이크로서비스 초간단 실습④',
    content:
      '2차시 교육 ④ : Correlation and Compensation 개발 역량 장착 이야기가 벌써 5회째이군요. 😅 원래 기획 의도는 5회만에 포스팅을 모두 마칠 생각이었는데, 쓰다보니 주구장창 길어지고 있습니다. ㅜㅜ 1회 포스팅 내용을 더듬어 기억해 보니 Cloud Application Modernization Developer 과정은 총 13일동안 4과목 & 2번의 평가가 진행되는 과정이어서, 4개 과목에 대해 각각 1회차씩 포스팅을 하고 마지막 포스팅은 기타 못다한 멘트를 더하면 되지 않을까 하는 생각에 5회 분량으로 연재할 거다라고 하였었네요… ^^;; 그런데 배웠던 내용들을 복기하면서 논리적으로 연결시키려다 보니 수업에서 배우지 않았던 내용까지도 포함하여 작성을 하게 되었네요.. 코딩까지도 새로 하면서요… (물론 줄거리의 긴박한 전개를 위해 생략한 내용도 있습니다 ^^) 모쪼록 이런 삽질 작업이 독자 한분에게만이라도 유용한 팁이 되기를 바라 마지 않습니다. 😙 Correlation Key 지난 시간까지 마이크로서비스간 동기/비동기 통신에 대해 학습한 내용을 공유하여 드렸습니다. 이번에는 Compensation and Correlation 패턴이라는 것을 배워보도록 하겠습니다. 사실, 마이크로서비스간 동기/비동기 통신만 알면 핵심적인 지식은 다 터득한 셈입니다. 서로 다른 시스템간 데이터를 어떻게 주고 받아야 하고, 데이터 일관성과 무결성 유지를 위해 어떻게 동기화해야 할지는 동기/비동기 통신을 바탕으로 응용이 되는 것이니깐요… 제가 사용한 simplemall 시나리오가 많이 빈약하긴 하지만, “주문취소”라는 비지니스 상황을 가정하여 보겠습니다. order 서비스에서 생성된 상품 주문이 delivery 서비스에 전달되면 단순히 해당 상품 정보를 가지고 새로운 배송정보를 생성해주는 것과 달리 주문을 취소해달라는 요청이 delivery 서비스에 전달되면 기존의 배송 정보를 찾아서 삭제 or 취소 상태로 만들어주어야 합니다. 즉, order 서비스가 발행한 취소 주문이 delivery 서비스의 어떤 배송정보와 매칭되어야 할지 key값이 필요한 것이지요. 마치 관계형 데이터베이스 시스템의 foreign key처럼 말이지요. 암튼 이렇게 서로 다른 마이크로서비스간 데이터 일관성 처리를 위해 전달하는 key를 corrleation key라고 부릅니다. 주문 취소 구현 구현해 보겠습니다. simplemall에서는 고객이 취소를 요청할 경우 해당 주문정보를 아예 삭제하고 배송중이던 서비스도 아예 없던 것으로 하기로 했습니다. delivery 서비스에서 orderCancelled 이벤트 메시지를 수신하면 관련 배송정보를 찾아 삭제하는 로직을 의 EventHandler 안에 추가 구현합니다. 여기서 OrderCancelled의 getId()는 orderId를 말하는데 delivery 엔티티와 연결해주는 Correlation Key의 역할을 합니다. 위에서 주어진 orderyId를 가지고 있는 해당 delivery 엔티티를 찾기 위해서는 리포지토리 안에 다음과 같이 findByOrderId() 메소드가 있어야 합니다. 테스트해볼까요? 취소 주문이 잘 전달되어 배송정보가 삭제되는 것을 보실 수 있습니다. 😙 그런데 말입니다… 여기서 끝이 난 게 아닙니다. 상품을 취소했기 때문에 상품재고도 다시 원복되어야 합니다. 지난번 포스팅에서 상품 주문시 재고를 감소시켰던 것은 동기식 통신으로 처리했는데, 취소 처리시 재고 복원은 어떻게 하는 것이 좋을까요? 주문할 때에는 상품재고를 먼저 확인하여 재고 수량이 주문 수량 이상 있어야만 주문을 완료할 수 있는 것이기 때문에 동기식으로 처리하는 것이 비교적 안전하다고 할 수 있지만, 취소를 처리할 경우에는 그렇게 할 필요가 없습니다. 즉, 고객이 원하면 일단 단일 취소를 처리해주고, 독립적인 product에서 취소 메시지를 확인한 후 재고를 복원시켜줘도 비즈니스적으로 충분히 문제될 것이 없습니다. 구현을 해 보겠습니다. order 서비스에서 주문취소라는 이벤트는 한번만 발생시키면 되기 때문에, product서비스에서 이 메시지를 수신하여 상품재고를 복원하는 로직만 구현하면 됩니다. 아래와 같이요. 주문취소 후 재고 확인 테스트 테스트 해봅니다. 주문취소 후 상품 재고가 다시 늘어난 것을 확인할 수 있습니다. Compensation 패턴 이상과 같이 주문 취소 이벤트를 수신할 경우 관련 상품 재고를 복원하는 로직을 구현함으로써, 보통 모놀리스 시스템에서 트랜잭션이 실패할 경우 데이터 일관성 유지를 위해 Rollback 처리하는 것을 대신할 수 있는데 이러한 것을 Compensation 패턴이라고 합니다. 예를 들어, 앞서 상품을 주문 처리할 때 동기식 방식에 의해 상품 재고를 먼저 감소시킨 후, 주문을 완료하려고 하는 데 예기치 않은 에러가 발생했다고 가정해 봅시다. 오류가 발생했지만 서로 떨어져 있는 시스템간에는 Rollback할 방법이 없기 때문에 재고는 주문 수량만큼 감소한 채로 남게 됩니다. 따라서, 상품의 재고 처리를 위한 동기 호출 후에 주문이 완료되지 않을 경우에는 다시 상품 재고를 원복시키도록 하는 이벤트를 발생시켜 주어야 합니다. 이벤트 다이어그램 수정 이벤트 다이어그램을 수정해보겠습니다. (사용하지 않는 주문정보 변경 이벤트는 삭제하고, 대신에 “주문실패됨”이라는 이벤트 추가) 주문실패시 보상패턴 구현 수정된 이벤트를 반영하여 주문실패 로직을 구현해 보겠습니다. 주문 로직을 수행하다가 내부에서 실패시 OrderCancelled 이벤트를 발생시키려면 비즈니스 로직이 복잡해지기 때문에 Order.java의 내에 구현되었던 로직을 OrderController로 옮기는 것이 좋습니다. ※ Util.getParam()메소드는 아래 샘플소스를 다운받아 참고하세요 테스트해보겠습니다. 에러를 일으키기 위해 price값을 -1로 세팅해줍니다. 주문시 에러가 발생될 경우 OrderCancelled 이벤트가 발생되면서 product 재고를 복원된 것을 확인할 수 있습니다. 기존의 모놀리스 시스템이 가지는 장점인 rollback 대신에 이렇게 구현하는 것이 약간 번거로울 수 있지만, 깔끔하게 보상 처리가 된 것이지요. 보상 패턴은 일종의 워크플로우처럼 작동되는 모습을 가지며, 또한 독립된 각각의 마이크로서비스가 갖는 데이터에 대하여 비즈니스적으로 통합된 일관성과 무결성을 유지하도록 하는 기술적 전략이기도 합니다. 이제 주요한 개발은 다 마친 것 같습니다. 다음번에는 CQRS 패턴을 구현해보도록 하겠습니다. https://www.msaschool.io/ simplemall.zip < EOF >',
    createdAt: '2021-12-01',
    companyName: 'SKCNC',
    tags: ['agile', 'developer', 'msa', 'developer'],
    url: 'https://engineering-skcc.github.io/developer/Developer-5/',
    keywords: ['hilt', 'liff', '릭스', 'gif', 'ga', 'git', 'let', '누수', 'naver', '번들'],
    logoSrc: 'https://www.skcc.co.kr/v2/img/kr/layout/favicon.ico',
  },
  {
    id: 12856,
    feedId: 'Qsx1NIYBAWExQKiWbN9M',
    title: 'Nvidia GPU Cloud: 도커 컨테이너를 사용한 딥 러닝 | Smilegate.AI',
    content:
      '[서비스개발팀 임창대] 높은 정확도를 가진 딥러닝 모델 개발에는 긴 시간이 소요됩니다. 모델 훈련과 미세 조정, 최적화를 거치며 만족하는 모델을 만들기까지 수 주일 또는 수 개월이 걸릴 수 있습니다. NVIDIA NGC 는 AI와 HPC 컨테이너, 사전 훈련된 모델, SDK, 헬름 차트(Helm chart)들을 제공하는 GPU 최적화 허브로 딥러닝 어플리케이션 개발 간소화와 가속화를 위해 고안되었습니다. NVIDIA NGC 는 컴퓨터 비전, 음성과 언어의 이해와 같은 AI 업무 전반에서 사전 훈련된 모델을 제공합니다. 딥 러닝 모델을 처음부터 구축하려면 대규모의 고품질 데이터를 가지고 있어야 합니다. 하지만 이러한 데이터를 구축하는 것은 쉬운 일이 아닙니다. 그리고 일단 데이터가 확보된다고 하더라도 훈련 용 데이터로의 재구성과 준비가 필요할지도 모릅니다. 결국 데이터 과학자들은 딥 러닝 모델의 설계보다 데이터의 분류 및 정제에 더 긴 시간을 할애해야 하는 문제에 직면합니다. 또한 일반적인 개발 과정에는 오픈 소스 프레임워크로 딥 러닝 모델을 구축한 후 훈련, 개선, 재 훈련을 수차례 거듭하며 다수의 반복(iteration)에서 목표한 수준의 정확도를 달성하는 과정이 필요합니다. 여기에서 딥 러닝 모델의 규모와 복잡성이 또 다른 문제로 작용합니다. 지난 5년 사이 컴퓨팅 리소스에 대한 수요는 5년 전의 ResNet 50에서 현재의 BERT-Megatron 모델에 이르기까지 약 30,000배 증가했습니다. 이러한 대형 모델을 처리하려면 GPU 기반 대규모 클러스터 시스템이 필수적입니다. 사전 훈련된 모델은 그 명칭이 의미하는 바와 같이 특정 분야의 데이터를 이용하여 미리 훈련을 진행한 모델을 말합니다. 이 모델에는 해당 데이터에 맞춰 미세 조정된 가중치가 포함되어 있습니다. 따라서 개발을 가속화하고 싶으면 사전 훈련된 모델을 기반으로 훈련을 수행하여 모델 훈련의 시간을 절약할 수 있습니다. 여기에서 사용되는 기법이 전이 학습(Transfer Learning)입니다. NVIDIA NGC catalog는 자율주행, 헬스케어, 제조 등 특정 산업에 특화된 사전 훈련된 모델들을 제공합니다. 비전(vision) 데이터를 위해 탐지, 분류, 분할 모델을 제공합니다.음성(speech) 데이터를 위해 자동 음성인식, 음성 합성, 번역 모델을 제공합니다. 언어(language) 데이터를 위해 언어 모델링, 추천 시스템 모델을 제공합니다. 이러한 사전 훈련된 모델은 NVIDIA Research와 NVIDIA의 파트너사들이 직접 개발합니다. 사전에 훈련을 마친 모델은 기존의 산업용 SDK에 원활히 통합할 수 있습니다. 그 예시로 헬스케어를 위한 NVIDIA Clara, 대화형 모델을 위한 NVIDIA Riva, 딥 러닝 추천 시스템을 위한 NVIDIA Merlin, 자율주행 자동차를 위한 NVIDIA DRIVE 등과 손쉽게 통합되어 제작의 속도를 높입니다. 제공되는 모델 중에 선택이 끝나면, 사전에 훈련된 데이터와 다른 산업에 특화된 데이터로 훈련을 진행해야 합니다. 이때 NVIDIA Transfer Learning Toolkit (NVIDIA TLT) 는 Python 기반 딥 러닝 툴킷으로 사전 훈련된 딥 러닝 모델을 가져와 산업에 특화된 데이터로 커스터마이징 해주고 배포도 할 수 있도록 도와줍니다. Referenceshttps://blogs.nvidia.co.kr/2021/05/26/fast-tracking-hand-gesture-recognition-ai-applications-with-pretrained-models-from-ngc/https://blogs.nvidia.co.kr/2021/07/05/fast-track-your-production-ai-with-pre-trained-models-and-transfer-learning-toolkit-3-0/',
    createdAt: '2021-12-06',
    companyName: '스마일게이트AI',
    tags: ['cloud'],
    url: 'https://smilegate.ai/2021/12/06/nvidia-gpu-cloud-%eb%8f%84%ec%bb%a4-%ec%bb%a8%ed%85%8c%ec%9d%b4%eb%84%88%eb%a5%bc-%ec%82%ac%ec%9a%a9%ed%95%9c-%eb%94%a5-%eb%9f%ac%eb%8b%9d/',
    keywords: [
      '소프트웨어',
      '번들',
      'safari',
      '증분',
      '원활',
      'streams',
      '행태',
      '데이터베이스',
      'demo',
      'let',
    ],
    logoSrc: 'https://raw.githubusercontent.com/trycatch-ssafy/logo/main/smilegate.png',
  },
  {
    id: 12857,
    feedId: 'Q8x1NIYBAWExQKiWbN9M',
    title: '프레임워크 변경도전기 (Apex to AWS Chalice)',
    content:
      'Overview 오픈소스화된 Private 프레임워크를 통해 개발자들은 편리하게 API를 개발할 수 있고, 개발된 API를 다양한 서비스와의 확장 및 연결하는 데도 도움을 받을 수 있습니다. 문제는 어디까지나 개인의 제작물인 만큼 제작자가 언제든지 지원종료 및 레포지토리를 폐쇄할 수 있고, 이 경우 이미 해당 프레임워크를 통해 서비스를 제공하고 있다면 꽤나 곤란한 상황이 발생할 수 있습니다. 이번 글은 실제로 서비스 종료된 프레임워크인 Apex에서 AWS Chalice로 변경하는 작업을 통해 이런 난감한 상황을 극복했던 과정을 써보도록 하겠습니다. Contents 브랜디의 CI/CD 방식 브랜디에서는 AWS에서 제공하는 다양한 서비스들을 활용해서 CI/CD를 구축하고 있습니다. 간단하게 해당 과정을 도식화하자면 다음과 같습니다. 이렇게 브랜디가 서비스하고 있는 대부분의 API들은 네 가지 AWS 서비스를 활용해 간편하고 유기적으로 CI/CD를 진행하고 있습니다. 다만 모든 람다함수들이 코드 파이프라인을 통해 빌드/배포되는 건 아닙니다. 모듈단위 람다함수 관리 API를 구성하는데 쓰이지 않는 단순한 모듈단위의 람다함수의 경우 코드파이프라인을 쓰기에는 아무래도 비용적인 문제가 떠오를 수밖에 없습니다. 크기도 크기지만, 지속적통합의 빈도가 높지 않은 모듈의 경우에는 위처럼 네 가지 서비스를 모두 사용해 달마다 각각의 비용 청구를 감수하기에는 아무래도 아깝다는 생각이 듭니다. 이런 이유에서 AWS SQS에서 전달받은 내용들을 지정된 템플릿에 파싱해서 알림톡 전송서비스인 비즈엠에 보내는 알림톡 모듈과 같은 간단한 람다함수들은 코드파이프라인을 따로 구축하지 않고 오픈소스 프레임워크인 Apex를 통해 간단하게 CI/CD를 진행해오고 있었습니다. 형상 관리만 코드커밋을 통해 해주고, 빌드와 배포는 Apex를 통해 로컬에서 커맨드라인으로 간단한 배포명령을 내려주면 이후의 과정은 Apex가 대신해 주는 형식입니다. 형상관리와 빌드/배포를 따로따로 해주는 약간의 수고로움은 있지만 네 개의 AWS 서비스를 한 개로 줄이니 당연히 비용은 적게 들 수 밖에 없습니다. 당면한 문제 문제는 이 편리한 프레임워크인 Apex가 개인이 만든 오픈소스 프레임워크였다는 점입니다. Apex는 제작자가 Up이라는 새로운 프로젝트를 진행하기 위해 지원 및 서비스 종료가 결정되었고 해당 레포지토리는 폐쇄되었습니다. 결과적으로 이전에 Apex 프레임워크를 다운로드한 팀원들 외에는 저처럼 서비스 종료가 결정된 후 입사한 인원들 누구도 Apex 프레임워크를 사용할 수 없게 되었고, Apex로 배포관리되는 알림톡 모듈을 리팩토링하거나 추가할 사항이 생길 경우에는 코드커밋에 푸시한 이후 Apex가 설치 되어있는 팀원에게 배포를 부탁드려야 했습니다. 더 큰 문제는 알림톡 모듈을 작업했던 인원들 중 대부분이 퇴사, 포맷 등의 이유로 Apex 프레임워크를 소실하게 되었고, 급기야는 단 한 명을 제외하고는 Apex를 가진 사람이 없는 상황이 펼쳐졌습니다. 미래를 생각했을 때 람다 배포용 프레임워크를 하루속히 바꿔야 했습니다. 왜 찰리스였는가? Serverless, Zappa, Architect, AWS Chalice 등 다양한 배포용 프레임워크가 존재하였지만, 그 중 AWS Chalice를 선택한 이유는 다음과 같습니다. 이런 이유들을 통해 최종적으로 AWS Chalice로 기존 알림톡 모듈을 컨버전하기로 결정하였습니다. 변경과정 구조분석 컨버전할 프레임워크가 결정되었으니 우선 Apex와 Chalice의 기본 프로젝트의 구조를 확인하여 어떤 식으로 배치해야 할지, 알림톡 모듈의 컨버전을 진행하면서 추가나 수정할 사항이 있는지 확인부터 하기로 했습니다. 한눈에 봐도 기본 폴더와 파일 개수가 차이 나는 것을 확인하실 수 있습니다. 안에 폴더 하나하나가 각각 람다함수가 되는 Apex의 기본프로젝트 구조와 다르게 Chalice의 경우 하나의 프로젝트가 하나의 람다함수가 되는 구조를 갖추고 있었습니다. 환경설정용 json과 배포용 로그를 남기는 폴더, 람다함수 실행 시 메인 함수 외에 헬퍼 함수나 sql파일 그외 여러 필요한 파일이나 폴더들을 담아두는 , 테스트용 파이썬파일을 담는 폴더, 여기에 빌드 시 필요한 패키지를 설치할 수 있게 지원해주는 까지 비교적 친절하게 세분화되어있는 기본 구조를 제공하는 Chalice와 달리 Apex는 유저들이 입맛에 맞춰 프로젝트 구조를 커스터마이징 할 수 있게 최소한의 파일만 제공하고 있었습니다. 결론적으로 자유도가 높은 Apex 프로젝트 특성상 프로젝트 구조가 만드는 사람에 따라 각양각색일 가능성이 높았고, 전후 프레임워크들의 기본프로젝트 구조를 살펴본 후엔 어떤 구조로 현재의 프로젝트가 구축되어있는지 그 구조를 파악하고 분석하는게 중요하다는 생각이 들었습니다. 아래의 그림은 기존 프로젝트 분석을 끝낸 후 저 나름대로 정리한 프로젝트의 구조 및 용도별 분류도와 실제 서비스 프로세스가 코드 내에서 어떻게 진행되는지 보여주는 플로우 차트입니다. 그림에서 보다시피 자체 환경변수 및 템플릿, 실행파일, 환경설정용 json, 필요한 패키지 설치용 파일까지 총 네 가지 카테고리로 프로젝트 안에 파일들을 분류할 수 있으며, 소스코드를 분석해 다음과 같은 과정을 거쳐 알림톡 모듈이 실행된다는 사실을 확인할 수 있습니다. 프로젝트 재구성 이제 분석을 통해 서비스프로세스와 기존 프로젝트 구조를 알았으니 이제 서비스프로세스를 AWS Chalice에 맞게 적절하게 재배치 및 테스트를 해주면 로컬에서의 프레임워크 컨버젼이 끝나게 됩니다. 위의 그림은 재배치 및 일부 수정을 통해 컨버젼을 마친 신규 AWS Chalice 프로젝트입니다. 프로젝트의 구조를 너무 크게 바꾸면 모듈 임포트 경로 설정 시 일일이 조정해야 되는 번거로움도 있고, 추후 작업자들이 작업할 때도 불편함을 느낄 가능성을 고려해 최대한 기존 프로젝트와 비슷한 프로젝트 구조를 유지하려고 노력했습니다. 다만 함수설정과 환경설정에 json 파일이 일일히 존재하는 것 보다는 하나의 json에 depth를 두어 관리하는게 좀 더 간편해 보여 일원화 작업을 진행했고, 메인 함수 외 함수들을 메인 함수와 똑같은 경로에 두기보다는 폴더 아래 두어서 용도 별로 함수를 분리해보았습니다. 유닛테스트용 테스트파일도 하나 추가 해두었고, 폴더를 그대로 생성해도 되는 Apex와 달리 AWS Chalice의 경우 라는 명칭의 폴더 아래에 폴더를 두어야 정상적으로 람다 함수에 폴더가 생성되는 특징이 있기 때문에 이점을 고려해 폴더를 생성하고 빌드 시 Hook으로 설치되는 패키지 설치경로를 폴더로 수정해두었습니다. 배포테스트 프로젝트 재배치를 마치고 유닛테스트 및 로컬테스트 시 모듈의 작동에 문제가 없다면 이제는 권한설정을 하고 실제 AWS Lambda에 배포 테스트를 진행해야 합니다. AWS Chalice의 경우 내 이 실제 람다함수명이 됩니다. 이 점 유의하면서 배포를 진행합니다. 로컬에서 다음과 같이 에 주석을 수정해서 배포를 진행해보겠습니다. AWS Chalice의 배포명령어는 기본적으론 입니다. 하지만 저는 파일로 stage를 두어 staging과 master를 다르게 구성하였으므로 이란 명령어로 스테이징용 AWS lambda에 배포를 진행하였습니다. 배포가 성공하게 되면 콘솔에 다음과 같은 메시지를 볼 수 있습니다. 실제 AWS lambda에서도 확인해보시면 해당 내용이 잘 반영된걸 볼 수 있습니다. 제가 컨버젼한 알림톡 모듈의 경우 SQS를 통해 API와 연결되는 모듈이므로 SQS에 연결되어있는 기존의 Apex함수를 처리하고 이번에 신규로 추가한 Chalice기반 함수로 람다트리거를 바꿔주었습니다. 모든 과정이 끝나고 스테이징서버에서 알림톡 발송을 시도하고 실제 휴대폰에서 받아본 내역입니다. 이로써 프레임워크 컨버젼이 성공적으로 끝났습니다! ☺️ Conclusion 2016년도에 전 세계 Node.js 기반 수천 개의 프로그램이 한순간에 먹통이 되는 일이 발생했습니다. 사건의 원인은 캘리포니아 한 개발자가 NPM 커뮤니티에서 삭제한 11줄의 코드였습니다. 수천 개의 프로젝트들이 개인 개발자의 11줄짜리 패키지에 의존하고 있었고 해당 코드가 삭제되자 관련된 모든 프로그램이 셧다운이 된 것입니다. 오픈소스화된 프레임워크나 패키지는 편리한데다가 강력하지만 이렇듯 역린 또한 존재합니다. 갑작스러운 지원종료라는 이슈도 마주하고 이를 통해 프레임워크 컨버젼을 실제로 진행하면서, 개발자도 예기치 못한 사태에도 대응할 수 있는 상황판단력과 더 나아가 오픈소스라는 편리함 없이도 자유자재로 개발이 가능한 실력을 어떻게 키워야 하는지 고민하게 되는 좋은 계기가 된 것 같습니다. 긴 글 봐주셔서 감사합니다! 참고 https://aws.github.io/chalice/',
    createdAt: '2021-12-01',
    companyName: '브랜디',
    tags: [],
    url: 'http://labs.brandi.co.kr//2021/12/01/kimkw2.html',
    keywords: ['liff', 'linux', '베타', 'devops', '도출', '누수', 'slack', '리포', 'naver', 'let'],
    logoSrc: 'https://raw.githubusercontent.com/trycatch-ssafy/logo/main/brandi.png',
  },
];

const BookmarkFeedList = () => {
  const [toast, setToast] = useRecoilState(toastState);
  const [checkedItems, setCheckedItems] = useState<Array<number>>([]);

  const handleSingleCheck = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedItems([...checkedItems, id]);
    } else {
      setCheckedItems(checkedItems.filter((el) => el !== id));
    }
  };

  const onSingleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSingleCheck(e.target.checked, Number(e.target.id));
  };

  const handleAllCheck = (checked: boolean) => {
    if (!checked) {
      const allItems: Array<number> = [];
      MBookmarkFeedList?.forEach((el) => allItems.push(el.id));
      setCheckedItems(allItems);
    } else {
      setCheckedItems([]);
    }
  };

  const onAllCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleAllCheck((e.target as HTMLInputElement).checked);
  };
  const queryClient = useQueryClient();
  const unBookmark = useMutation(putBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries(['bookmarkFeedList']);
    },
  });

  const onDelete = () => {
    const newFeedItemList = MBookmarkFeedList?.filter(
      (el) => checkedItems.includes(el.id) === true
    );

    newFeedItemList?.map((item) => {
      return unBookmark.mutate({ id: item.id, type: 'FEED' });
    });

    if (newFeedItemList && newFeedItemList?.length > 0) {
      setToast({
        type: 'positive',
        message: '북마크에서 제거되었습니다.',
        isVisible: true,
      });
    }
  };

  return (
    <Wrapper>
      {/* 북마크 피드 아이템이 있을 때 */}
      {MBookmarkFeedList && MBookmarkFeedList?.length > 0 && (
        <>
          <ul>
            {MBookmarkFeedList?.map((feedItem) => {
              const isChecked = !!checkedItems.includes(feedItem.id);

              return (
                <FeedItemWrapper key={feedItem.id}>
                  <Checkbox
                    label={String(feedItem.id)}
                    checked={isChecked}
                    onChange={onSingleCheck}
                  />
                  <BookmarkFeedItem {...feedItem} />
                </FeedItemWrapper>
              );
            })}
          </ul>
          <ButtonWrapper>
            <Btn
              designType="blueEmpty"
              onClick={onAllCheck}
              checked={checkedItems.length === MBookmarkFeedList?.length}
            >
              {checkedItems.length === MBookmarkFeedList?.length ? '전체 해제' : '전체 선택'}
            </Btn>
            <Button designType="blueEmpty" onClick={onDelete}>
              선택 삭제
            </Button>
          </ButtonWrapper>
        </>
      )}
      {/* 북마크 피드 아이템이 없을 때 */}
      {MBookmarkFeedList?.length === 0 && <BookmarkEmpty category="피드" />}
    </Wrapper>
  );
};

export default BookmarkFeedList;
