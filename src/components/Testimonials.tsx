import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    case: "Infidelidade Conjugal",
    rating: 5,
    text: "Profissional extremamente competente e discreto. Conseguiu as provas que eu precisava de forma ética e legal. Recomendo totalmente o trabalho do Reginaldo.",
    result: "Caso resolvido em 15 dias"
  },
  {
    id: 2,
    name: "Dr. João Santos",
    case: "Investigação Empresarial",
    rating: 5,
    text: "Contratei para investigar possível fraude na empresa. O trabalho foi impecável, com relatório detalhado e provas irrefutáveis. Excelente profissional.",
    result: "Fraude descoberta e R$ 150mil recuperados"
  },
  {
    id: 3,
    name: "Ana Costa",
    case: "Localização de Pessoas",
    rating: 5,
    text: "Estava há anos procurando minha irmã. O Reginaldo conseguiu localizá-la em poucos dias. Profissionalismo e humanidade em cada atendimento.",
    result: "Pessoa localizada em 7 dias"
  },
  {
    id: 4,
    name: "Carlos Oliveira",
    case: "Investigação Patrimonial",
    rating: 5,
    text: "Precisava de informações patrimoniais para um processo judicial. O trabalho foi executado com total sigilo e as informações foram fundamentais para o caso.",
    result: "Processo judicial ganho"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Casos de Sucesso
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Depoimentos de Clientes Satisfeitos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mais de 500 casos resolvidos com sucesso em Brasília DF. 
            Veja o que nossos clientes dizem sobre nossos serviços de investigação particular.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    {testimonial.case}
                  </Badge>
                </div>
                
                <blockquote className="text-lg mb-4 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">Cliente Verificado</div>
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{testimonial.result}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-primary/10 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Mais de 15 Anos de Experiência
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Casos Resolvidos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Taxa de Sucesso</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24h</div>
                <div className="text-muted-foreground">Atendimento</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};