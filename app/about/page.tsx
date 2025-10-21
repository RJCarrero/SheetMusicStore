import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Music, Award, BookOpen } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground text-balance">About Me</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">Composer, Arranger, and Music Educator</p>
        </div>

        {/* Profile Section */}
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          {/* Profile Image */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border bg-muted">
            <Image src="/professional-musician.png" alt="Profile photo" fill className="object-cover" />
          </div>

          {/* Bio */}
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Welcome to Maestro Music</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Hello! I'm a passionate musician and composer dedicated to creating high-quality sheet music for
                  performers of all levels. With over 15 years of experience in music education and performance, I
                  understand what musicians need to succeed.
                </p>
                <p>
                  My journey in music began at a young age, and I've had the privilege of studying with renowned
                  instructors and performing with prestigious ensembles. This experience has shaped my approach to
                  composition and arrangement, always keeping the performer's needs at the forefront.
                </p>
                <p>
                  Every piece of sheet music in this collection has been carefully crafted with attention to detail,
                  proper notation, and musical expression. Whether you're a student, educator, or professional
                  performer, you'll find music that challenges and inspires.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground">Education</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground">Master of Music in Composition</h4>
                <p className="text-sm text-muted-foreground">Conservatory of Music, 2015</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Specialized in contemporary composition and orchestration
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Bachelor of Music in Performance</h4>
                <p className="text-sm text-muted-foreground">University of the Arts, 2012</p>
                <p className="text-sm text-muted-foreground mt-1">Focus on percussion performance and music theory</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills & Expertise */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Music className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground">Skills & Expertise</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Composition</Badge>
              <Badge variant="secondary">Arranging</Badge>
              <Badge variant="secondary">Music Theory</Badge>
              <Badge variant="secondary">Orchestration</Badge>
              <Badge variant="secondary">Percussion Performance</Badge>
              <Badge variant="secondary">Music Education</Badge>
              <Badge variant="secondary">Notation Software</Badge>
              <Badge variant="secondary">Audio Production</Badge>
              <Badge variant="secondary">Choral Writing</Badge>
              <Badge variant="secondary">Jazz Harmony</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Experience Highlights */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground">Experience Highlights</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>15+ years of professional music composition and arrangement</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Published works performed by ensembles across the country</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Music educator at prestigious institutions and private studios</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Commissioned composer for schools, churches, and professional groups</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Award-winning compositions in regional and national competitions</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Teaching Philosophy */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground">My Approach</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              I believe that great sheet music should be both technically sound and musically inspiring. Each piece I
              create is designed to challenge performers while remaining accessible and enjoyable. My goal is to provide
              musicians with repertoire that helps them grow as artists while bringing joy to both performers and
              audiences alike.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
