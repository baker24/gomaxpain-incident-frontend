export default function AccidentsLastHour() {
    return (
      <div className="space-y-6">
        
        {/* Main Accidents Today Card */}
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          
          {/* Card content */}
          <div className="relative bg-background/80 backdrop-blur-sm border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-all duration-300 hover:scale-105">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-primary/80 font-mono uppercase tracking-wider">
                Accidents Last Hour
              </h3>
              <div className="text-primary/60 group-hover:text-primary transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
  
            {/* Main value */}
            <div className="mb-2">
              <span className="text-4xl font-bold text-foreground font-mono">
                210
              </span>
            </div>
  
            {/* Subtitle */}
            <p className="text-sm text-secondary font-mono mb-3">
              Real-time incidents
            </p>
  
            {/* Trend indicator */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-mono bg-red-500/10 text-red-400 border border-red-500/20">
                <svg className="w-3 h-3 rotate-180" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Last updated at 10:00 AM EST
              </div>
            </div>
          </div>
        </div>
  
        
      </div>
    );
  }
  