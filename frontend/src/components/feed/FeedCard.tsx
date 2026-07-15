import React from 'react'
import Link from 'next/link'
import { FeedItem } from '@/types/feed'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, GitFork, AlertCircle, ExternalLink, ArrowRight } from 'lucide-react'

interface FeedCardProps {
  item: FeedItem
}

export function FeedCard({ item }: FeedCardProps) {
  const repo = item.repository
  
  // Calculate display score (capping at 100 for the width bar if needed)
  const score = Math.round(item.scoreInfo.totalScore)
  
  return (
    <div className="bg-[#121212] rounded-2xl border border-white/[0.05] hover:border-white/[0.1] transition-all duration-300 mb-6 overflow-hidden flex flex-col">
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-emerald-900" style={{ width: `${Math.min(score, 100)}%` }} />
      
      <div className="p-6 pb-3">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Link href={`/dashboard/repository/${repo.id}`} className="hover:text-emerald-400 transition-colors">
                {repo.fullName}
              </Link>
            </h3>
            <p className="text-neutral-400 mt-2 line-clamp-2 text-sm">
              {repo.description || "No description provided."}
            </p>
          </div>
          
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1 flex-shrink-0 text-sm font-mono">
            Score: {score}
          </Badge>
        </div>
      </div>
      
      <div className="p-6 pt-0 space-y-4">
        {/* Why it's a match */}
        <div className="bg-black/40 rounded-lg p-4 border border-white/[0.02]">
          <h4 className="text-sm font-medium text-emerald-500 mb-1 flex items-center gap-2">
            <SparklesIcon className="w-4 h-4" /> Why it's a match
          </h4>
          <p className="text-sm text-neutral-300 leading-relaxed">
            {item.scoreInfo.breakdown.fallback 
              ? "Recommended based on community popularity." 
              : `Matched based on skill alignment (${Math.round(item.scoreInfo.breakdown.contentScore)}), collaboration network (${Math.round(item.scoreInfo.breakdown.collabScore)}), and shared topics (${Math.round(item.scoreInfo.breakdown.topicScore)}).`
            }
          </p>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {repo.languages && Object.keys(repo.languages).slice(0, 3).map(lang => (
            <Badge key={lang} variant="secondary" className="bg-white/[0.05] text-neutral-300 hover:bg-white/[0.1]">
              {lang}
            </Badge>
          ))}
          {repo.frameworks.slice(0, 3).map(fw => (
            <Badge key={fw} variant="outline" className="border-white/[0.1] text-neutral-400">
              {fw}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="p-6 pt-4 border-t border-white/[0.05] flex justify-between items-center text-sm text-neutral-500 mt-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>{(repo.stars || 0).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="w-4 h-4" />
            <span>{(repo.forks || 0).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            <span>{(repo.openIssuesCount || 0).toLocaleString()} issues</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white" asChild>
            <a href={repo.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" /> GitHub
            </a>
          </Button>
          <Button variant="default" size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium" asChild>
            <Link href={`/dashboard/repository/${repo.id}`}>
              View details <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  )
}
