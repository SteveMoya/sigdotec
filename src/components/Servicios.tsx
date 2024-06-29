import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Servicios() {
    return (
        <div>
            <section className="w-full py-12">
                <div className="container grid gap-6 md:gap-8 px-4 md:px-6 max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                        <div className="grid gap-1">
                            <h1 className="text-2xl font-bold tracking-tight">Pricing</h1>
                            <p className="text-muted-foreground">Choose the plan that's right for your business.</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Starter</CardTitle>
                                <div className="text-4xl font-bold">$9</div>
                                <p className="text-muted-foreground">per month</p>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div>
                                    <h3 className="font-semibold">What's included</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2">
                                            <CheckIcon className="w-4 h-4 fill-primary" />
                                            5 projects
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckIcon className="w-4 h-4 fill-primary" />
                                            1 GB storage
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckIcon className="w-4 h-4 fill-primary" />
                                            Basic support
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Get started</Button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Pro</CardTitle>
                                <div className="text-4xl font-bold">$49</div>
                                <p className="text-muted-foreground">per month</p>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div>
                                    <h3 className="font-semibold">What's included</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2">
                                            <CheckIcon className="w-4 h-4 fill-primary" />
                                            Unlimited projects
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckIcon className="w-4 h-4 fill-primary" />
                                            50 GB storage
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckIcon className="w-4 h-4 fill-primary" />
                                            Priority support
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Get started</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </section>
            <section className="w-full py-12">
                <div className="container grid gap-6 md:gap-8 px-4 md:px-6 max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                        <div className="grid gap-1">
                            <h1 className="text-2xl font-bold tracking-tight">Comparison</h1>
                            <p className="text-muted-foreground">See how our plans compare to find the best fit.</p>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-4 pr-4 font-medium">Features</th>
                                    <th className="py-4 pr-4 font-medium">Starter</th>
                                    <th className="py-4 pr-4 font-medium">Pro</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-4 pr-4">Projects</td>
                                    <td className="py-4 pr-4">5</td>
                                    <td className="py-4 pr-4">Unlimited</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-4 pr-4">Storage</td>
                                    <td className="py-4 pr-4">1 GB</td>
                                    <td className="py-4 pr-4">50 GB</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-4 pr-4">Support</td>
                                    <td className="py-4 pr-4">Basic</td>
                                    <td className="py-4 pr-4">Priority</td>
                                </tr>
                                <tr>
                                    <td className="py-4 pr-4">Price</td>
                                    <td className="py-4 pr-4">$9/month</td>
                                    <td className="py-4 pr-4">$49/month</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <path d="M20 6 9 17l-5-5" />
        </svg>
    )
}