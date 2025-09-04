import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Como Escolher um Detetive Particular Confiável em Brasília",
    excerpt: "Guia completo com 10 critérios essenciais para contratar um investigador particular competente e ético em Brasília DF.",
    category: "Guias",
    readTime: "5 min",
    publishDate: "15 Mar 2024",
    image: "/api/placeholder/400/250"
  },
  {
    id: 2,
    title: "Investigação de Infidelidade: O que é Legal e Ético",
    excerpt: "Entenda os limites legais da investigação conjugal e como um detetive particular pode ajudar de forma ética e profissional.",
    category: "Direitos",
    readTime: "7 min",
    publishDate: "10 Mar 2024",
    image: "/api/placeholder/400/250"
  },
  {
    id: 3,
    title: "Investigação Empresarial: Protegendo seu Negócio",
    excerpt: "Como a investigação particular pode prevenir fraudes, vazamentos e proteger os interesses da sua empresa em Brasília.",
    category: "Empresarial",
    readTime: "6 min",
    publishDate: "05 Mar 2024",
    image: "/api/placeholder/400/250"
  },
  {
    id: 4,
    title: "Localização de Pessoas: Métodos Legais e Eficazes",
    excerpt: "Técnicas modernas e legais utilizadas por detetives particulares para localizar pessoas desaparecidas no DF.",
    category: "Técnicas",
    readTime: "4 min",
    publishDate: "28 Fev 2024",
    image: "/api/placeholder/400/250"
  },
  {
    id: 5,
    title: "Investigação Patrimonial: Quando e Como Fazer",
    excerpt: "Guia sobre investigação de bens e patrimônio para processos judiciais, divórcios e cobranças em Brasília DF.",
    category: "Jurídico",
    readTime: "8 min",
    publishDate: "20 Fev 2024",
    image: "/api/placeholder/400/250"
  },
  {
    id: 6,
    title: "Tecnologia na Investigação Particular Moderna",
    excerpt: "Como a tecnologia revolucionou os métodos de investigação particular, mantendo sempre a ética e legalidade.",
    category: "Tecnologia",
    readTime: "6 min",
    publishDate: "15 Fev 2024",
    image: "/api/placeholder/400/250"
  }
];

const categories = ["Todos", "Guias", "Direitos", "Empresarial", "Técnicas", "Jurídico", "Tecnologia"];

export const Blog = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Blog Especializado
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Artigos sobre Investigação Particular
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Informações atualizadas, dicas práticas e orientações legais sobre investigação particular em Brasília DF.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === "Todos" ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300 group">
              <div className="aspect-video bg-muted rounded-t-lg mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="text-6xl opacity-20">📰</div>
                </div>
              </div>
              
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.publishDate}
                  </div>
                  <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                    Ler mais
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            Ver Todos os Artigos
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};