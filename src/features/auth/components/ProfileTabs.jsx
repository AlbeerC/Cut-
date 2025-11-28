import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export default function ProfileTabs() {
  return (
    <div className="w-full mt-6 px-8">
      <Tabs defaultValue="activity" className="w-full">
        
        {/* Tabs Header */}
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activity">Actividad</TabsTrigger>
          <TabsTrigger value="games">Juegos</TabsTrigger>
          <TabsTrigger value="stats">Estadísticas</TabsTrigger>
        </TabsList>

        {/* ----------- TAB 1: ACTIVIDAD ----------- */}
        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardContent className="p-4 space-y-4">

              <h3 className="text-lg font-semibold">Actividad reciente</h3>

              <ul className="space-y-3">
                <li className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                  Ganaste un juego de vs!  
                  <span className="block text-neutral-400 text-sm">Hace 2 horas</span>
                </li>
                <li className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                  Llegaste a ronda 10 en “Six Degrees”  
                  <span className="block text-neutral-400 text-sm">Ayer</span>
                </li>
                <li className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                  Subiste una nueva lista de películas favoritas  
                  <span className="block text-neutral-400 text-sm">Hace 3 días</span>
                </li>
              </ul>

            </CardContent>
          </Card>
        </TabsContent>

        {/* ----------- TAB 2: JUEGOS ----------- */}
        <TabsContent value="games" className="mt-4">
          <Card>
            <CardContent className="p-4">

              <h3 className="text-lg font-semibold mb-4">Juegos jugados</h3>

              <div className="space-y-4">

                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                  <div>
                    <p className="font-medium">Versus Battles</p>
                    <p className="text-sm text-neutral-400">58 partidas</p>
                  </div>
                  <span className="text-green-400 font-semibold">72% winrate</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                  <div>
                    <p className="font-medium">Six Degrees</p>
                    <p className="text-sm text-neutral-400">33 partidas</p>
                  </div>
                  <span className="text-green-400 font-semibold">Record: ronda 12</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                  <div>
                    <p className="font-medium">Timeline</p>
                    <p className="text-sm text-neutral-400">12 partidas</p>
                  </div>
                  <span className="text-green-400 font-semibold">Precisión: 63%</span>
                </div>

              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* ----------- TAB 3: ESTADÍSTICAS ----------- */}
        <TabsContent value="stats" className="mt-4">
          <Card>
            <CardContent className="p-4">
              
              <h3 className="text-lg font-semibold mb-4">Estadísticas generales</h3>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                  <p className="text-neutral-400 text-sm">Horas Jugadas</p>
                  <p className="text-3xl font-bold mt-1">46</p>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                  <p className="text-neutral-400 text-sm">Juegos Completados</p>
                  <p className="text-3xl font-bold mt-1">103</p>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                  <p className="text-neutral-400 text-sm">Récord Global</p>
                  <p className="text-3xl font-bold mt-1">Top 12%</p>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                  <p className="text-neutral-400 text-sm">Películas Vistas</p>
                  <p className="text-3xl font-bold mt-1">382</p>
                </div>

              </div>

            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
