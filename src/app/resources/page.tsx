import HubCard from "@/components/ui/HubCard";

export default function ResourcesPage() {
  return (
    <main className="hub-page">
      <div className="hub-header">
        <h1>Resources</h1>
        <p className="hub-subtitle">Tools, platforms, and libraries I use and recommend</p>
      </div>

      <div className="topic-section">
        <div className="section-header">
          <h2>Tools</h2>
        </div>
        <div className="card-grid always-visible">
          <HubCard
            href="https://postspark.app/"
            title="PostSpark"
            subtitle="Image Summarization"
            thumbnail="/assets/resources/PostSpark.jpg"
            external
          />
          <HubCard
            href="https://screen.studio/"
            title="Screen Studio"
            subtitle="Screen Recorder"
            thumbnail="/assets/resources/Screen%20Studio.jpg"
            external
          />
          <HubCard
            href="https://www.howdygo.com/free-tools/scrolling-website-video-generator"
            title="HowdyGo"
            subtitle="Scrolling Website Generator"
            thumbnail="/assets/resources/HowdyGo.jpg"
            external
          />
          <HubCard
            href="https://whimsical.com/"
            title="Whimsical"
            subtitle="Collaborative whiteboard app"
            thumbnail="/assets/resources/Whimsical.jpg"
            external
          />
        </div>
      </div>

      <div className="topic-section">
        <div className="section-header">
          <h2>Apps</h2>
        </div>
        <div className="card-grid always-visible">
          <HubCard
            href="https://quran.com/"
            title="Quran.com"
            subtitle="Quran Recitation"
            thumbnail="/assets/resources/Quran.com.jpg"
            external
          />
          <HubCard
            href="http://cleve.ai/"
            title="Cleve.ai"
            subtitle="LinkedIn Summarization"
            thumbnail="/assets/resources/Cleve.ai.png"
            external
          />
          <HubCard
            href="https://git-wrapped.com/"
            title="Git-Wrapped"
            subtitle="GitHub Summarization"
            thumbnail="/assets/resources/Git-Wrapped.jpg"
            external
          />
          <HubCard
            href="https://ticktick.com/"
            title="TickTick"
            subtitle="To-do app"
            thumbnail="/assets/resources/TickTick.jpg"
            external
          />
          <HubCard
            href="https://carbon.now.sh/"
            title="Carbon"
            subtitle="Code Image"
            thumbnail="/assets/resources/Carbon.png"
            external
          />
        </div>
      </div>

      <div className="topic-section">
        <div className="section-header">
          <h2>SaaS</h2>
        </div>
        <div className="card-grid always-visible">
          <HubCard
            href="https://www.featurebase.app/"
            title="Featurebase"
            subtitle="Changelog & Roadmap"
            thumbnail="/assets/resources/Featurebase.jpg"
            external
          />
          <HubCard
            href="https://mintlify.com/"
            title="Mintlify"
            subtitle="Documentation"
            thumbnail="/assets/resources/Mintlify.jpg"
            external
          />
        </div>
      </div>

      <div className="topic-section">
        <div className="section-header">
          <h2>UI Libraries</h2>
        </div>
        <div className="card-grid always-visible">
          <HubCard
            href="https://ui.shadcn.com/"
            title="Shadcn"
            subtitle="UI component library"
            thumbnail="/assets/resources/Shadcn.jpg"
            external
          />
          <HubCard
            href="https://magicui.design/"
            title="Magic UI"
            subtitle="UI component library"
            thumbnail="/assets/resources/Magic%20UI.jpg"
            external
          />
          <HubCard
            href="https://ui.aceternity.com/"
            title="Aceternity"
            subtitle="UI component library"
            thumbnail="/assets/resources/Aceternity.jpg"
            external
          />
          <HubCard
            href="https://21st.dev/"
            title="21st.dev"
            subtitle="UI component library"
            thumbnail="/assets/resources/21st.dev.jpg"
            external
          />
          <HubCard
            href="https://uiverse.io/"
            title="UI verse"
            subtitle="UI component library"
            thumbnail="/assets/resources/UI%20verse.jpg"
            external
          />
          <HubCard
            href="https://reactbits.dev/"
            title="ReactBits"
            subtitle="Animations"
            thumbnail="/assets/resources/ReactBits.jpg"
            external
          />
          <HubCard
            href="https://spline.design/"
            title="Spline"
            subtitle="Animations"
            thumbnail="/assets/resources/Spline.jpg"
            external
          />
        </div>
      </div>

      <div className="topic-section">
        <div className="section-header">
          <h2>Dev Platforms</h2>
        </div>
        <div className="card-grid always-visible">
          <HubCard
            href="https://v0.dev/"
            title="v0"
            subtitle="AI-powered UI generation"
            thumbnail="/assets/resources/v0.jpg"
            external
          />
          <HubCard
            href="https://bolt.new/"
            title="Bolt"
            subtitle="AI-powered development"
            thumbnail="/assets/resources/Bolt.jpg"
            external
          />
          <HubCard
            href="https://lovable.dev/"
            title="Lovable"
            subtitle="AI-powered development"
            thumbnail="/assets/resources/Lovable.jpg"
            external
          />
        </div>
      </div>

      <div className="topic-section">
        <div className="section-header">
          <h2>No-code Tools</h2>
        </div>
        <div className="card-grid always-visible">
          <HubCard
            href="https://www.framer.com/"
            title="Framer"
            subtitle="No-code website builder"
            thumbnail="/assets/resources/Framer.jpg"
            external
          />
          <HubCard
            href="https://www.canva.com/ai-code-generator/"
            title="Canva"
            subtitle="AI Code Generator"
            thumbnail="/assets/resources/Canva.jpg"
            external
          />
        </div>
      </div>

      <div className="topic-section">
        <div className="section-header">
          <h2>Playbooks</h2>
        </div>
        <div className="card-grid always-visible">
          <HubCard
            href="/resources/interview-prep"
            title="Interview Prep"
            subtitle="NeetCode, GreatFrontEnd, Algochurn, and more"
            thumbnail="/assets/resources/Interview%20Prep.jpg"
          />
          <HubCard
            href="/resources/system-design"
            title="System Design"
            subtitle="System Design School, Primer, NeetCodeIO"
            thumbnail="/assets/resources/System%20Design.jpg"
          />
          <HubCard
            href="/resources/career-toolkit"
            title="Career Toolkit"
            subtitle="Interview Warmup, NotebookLM, Cloud Skills Boost"
            thumbnail="/assets/resources/Career%20Toolkit.jpg"
          />
          <HubCard
            href="/resources/video-learning"
            title="Video Learning"
            subtitle="YouTube, Coursera, Udemy, Scrimba, and more"
            thumbnail="/assets/resources/Video%20Learning.jpg"
          />
          <HubCard
            href="/resources/programming-guides"
            title="Programming Guides"
            subtitle="FreeCodeCamp, W3Schools, GeeksforGeeks, and more"
            thumbnail="/assets/resources/Programming%20Guides.jpg"
          />
          <HubCard
            href="/resources/problem-solving"
            title="Problem Solving"
            subtitle="LeetCode, HackerRank, Codewars, CodingBat"
            thumbnail="/assets/resources/Problem%20Solving.jpg"
          />
          <HubCard
            href="/resources/github"
            title="GitHub"
            subtitle="Awesome Shadcn UI, Maker Skill Trees"
            thumbnail="/assets/resources/GitHub.jpg"
          />
        </div>
      </div>

      <div className="topic-section">
        <div className="section-header">
          <h2>Personal</h2>
        </div>
        <div className="card-grid always-visible">
          <HubCard
            href="/resources/telegram-channels"
            title="Telegram Channels"
            subtitle="16 tech and programming channels I follow"
            thumbnail="/assets/resources/Telegram%20Channels.png"
          />
          <HubCard
            href="/resources/newsletters"
            title="Newsletters"
            subtitle="Engineering, career, and system design newsletters"
            thumbnail="/assets/resources/Newsletters.jpg"
          />
          <HubCard
            href="/resources/portfolios-i-like"
            title="Portfolios I Like"
            subtitle="29 developer portfolios and templates for inspiration"
            thumbnail="/assets/resources/Portfolios%20I%20Like.jpg"
          />
          <HubCard
            href="/resources/demos-showcases"
            title="Demos & Showcases"
            subtitle="Tahrirchi, Pythagora 2.0, TopKadr"
            thumbnail="/assets/resources/Demos%20&%20Showcases.jpg"
          />
        </div>
      </div>
    </main>
  );
}
