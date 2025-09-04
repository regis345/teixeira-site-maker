import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Detetive Particular Brasília DF - Como Escolher Investigador Confiável",
    excerpt: "Guia completo com 10 critérios essenciais para contratar um detetive particular competente e ético em Brasília DF. Saiba como escolher.",
    category: "Guias",
    readTime: "5 min",
    publishDate: "15 Mar 2024",
    image: "/api/placeholder/400/250"
  },
  {
    id: 2,
    title: "Investigação Infidelidade Brasília DF - Detetive Particular Legal",
    excerpt: "Entenda os limites legais da investigação conjugal em Brasília DF e como um detetive particular pode ajudar de forma ética.",
    category: "Direitos",
    readTime: "7 min",
    publishDate: "10 Mar 2024",
    image: "/api/placeholder/400/250"
  },
  {
    id: 3,
    title: "Investigação Empresarial Brasília DF - Detetive Particular Empresas",
    excerpt: "Como o detetive particular pode prevenir fraudes empresariais, vazamentos e proteger os interesses da sua empresa em Brasília DF.",
    category: "Empresarial",
    readTime: "6 min",
    publishDate: "05 Mar 2024",
    image: "/api/placeholder/400/250"
  },
  {
    id: 4,
    title: "Localização de Pessoas Brasília DF - Detetive Particular Busca",
    excerpt: "Técnicas modernas e legais utilizadas por detetives particulares para localizar pessoas desaparecidas em Brasília DF e região.",
    category: "Técnicas",
    readTime: "4 min",
    publishDate: "28 Fev 2024",
    image: "/api/placeholder/400/250"
  },
  {
    id: 5,
    title: "Investigação Patrimonial Brasília DF - Detetive Particular Bens",
    excerpt: "Guia sobre investigação de bens e patrimônio por detetive particular para processos judiciais, divórcios e cobranças em Brasília DF.",
    category: "Jurídico",
    readTime: "8 min",
    publishDate: "20 Fev 2024",
    image: "/api/placeholder/400/250"
  },
  {
    id: 6,
    title: "Tecnologia Investigação Particular - Detetive Moderno Brasília DF",
    excerpt: "Como a tecnologia revolucionou os métodos de investigação do detetive particular moderno em Brasília DF, mantendo ética e legalidade.",
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
            Blog Detetive Particular Brasília DF - Investigação
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Artigos especializados sobre investigação particular, dicas de segurança e orientações legais para Brasília DF e região.
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