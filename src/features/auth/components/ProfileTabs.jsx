import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfileTabs({ activity, games, stats, general }) {

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
                {activity.map((item) => (
                  <li
                    key={item.id}
                    className="p-3 rounded-xl bg-neutral-900 border border-neutral-800"
                  >
                    {item.text}
                    <span className="block text-neutral-400 text-sm">
                      {item.date}
                    </span>
                  </li>
                ))}
              </ul>

              {activity.length === 0 && (
                <p className="text-neutral-400 text-sm">
                  Todavía no hay actividad reciente
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ----------- TAB 2: JUEGOS ----------- */}
        <TabsContent value="games" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Juegos jugados</h3>

              <div className="space-y-4">
                {games.map((game) => (
                  <div
                    key={game.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-900 border border-neutral-800"
                  >
                    <div>
                      <p className="font-medium">{game.name}</p>
                      <p className="text-sm text-neutral-400">
                        {game.gamesPlayed} partidas
                      </p>
                    </div>

                    {game.extraStat && (
                      <span className="text-green-400 font-semibold">
                        {game.extraStat}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ----------- TAB 3: ESTADÍSTICAS ----------- */}
        <TabsContent value="stats" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">
                Estadísticas generales
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                  <p className="text-neutral-400 text-sm">Horas Jugadas</p>
                  <p className="text-3xl font-bold mt-1">{stats?.hours_played} h</p>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                  <p className="text-neutral-400 text-sm">Días activos</p>
                  <p className="text-3xl font-bold mt-1">{general.activeDays}</p>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                  <p className="text-neutral-400 text-sm">Mejor racha</p>
                  <p className="text-xl font-bold mt-1">{general.bestStreak}</p>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                  <p className="text-neutral-400 text-sm">Juego favorito</p>
                  <p className="text-xl font-bold mt-1">{general.favoriteGame}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
