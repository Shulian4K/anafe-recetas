"use client"

import { configuracionesHorno, notasGenerales } from "@/lib/data-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Thermometer, Clock, Lightbulb } from "lucide-react"

export function OvenSettings() {
  const hayConfiguraciones = configuracionesHorno.length > 0
  const hayNotas = notasGenerales.length > 0

  return (
    <div className="space-y-8">
      {/* Configuraciones de Horno */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Flame className="h-5 w-5 text-accent" />
          <h2 className="text-xl font-semibold text-foreground">Configuraciones de Horno</h2>
        </div>
        
        {hayConfiguraciones ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {configuracionesHorno.map((config) => (
              <Card key={config.id} className="border-accent/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">{config.titulo}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3">{config.descripcion}</p>
                  <div className="flex items-center gap-4 flex-wrap">
                    {config.temperatura && (
                      <div className="flex items-center gap-1.5 text-sm">
                        <Thermometer className="h-4 w-4 text-accent" />
                        <span className="font-mono font-medium">{config.temperatura}</span>
                      </div>
                    )}
                    {config.tiempo && (
                      <div className="flex items-center gap-1.5 text-sm">
                        <Clock className="h-4 w-4 text-accent" />
                        <span className="font-mono font-medium">{config.tiempo}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="py-8 text-center">
              <Flame className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">
                Aún no hay configuraciones de horno.
              </p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Las iremos agregando cuando las necesites.
              </p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Notas y Tips */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-accent" />
          <h2 className="text-xl font-semibold text-foreground">Notas y Tips</h2>
        </div>
        
        {hayNotas ? (
          <div className="space-y-3">
            {notasGenerales.map((nota) => (
              <Card key={nota.id}>
                <CardContent className="py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{nota.titulo}</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {nota.contenido}
                      </p>
                    </div>
                    <Badge variant="outline" className="shrink-0 text-xs">
                      {nota.categoria}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="py-8 text-center">
              <Lightbulb className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">
                Aún no hay notas guardadas.
              </p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Aquí guardaremos conversiones, tips y técnicas.
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  )
}
