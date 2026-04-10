import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Key, Zap, Globe, Shield, Book } from "lucide-react";

const ApiDocs = () => {
  const endpoints = [
    {
      method: "POST",
      path: "/api/v1/reports/generate",
      description: "Generate a vehicle report with selected modules",
      params: ["registration", "modules[]", "format"]
    },
    {
      method: "GET",
      path: "/api/v1/reports/{id}",
      description: "Retrieve a previously generated report",
      params: ["id", "format"]
    },
    {
      method: "GET",
      path: "/api/v1/modules",
      description: "List all available data modules and pricing",
      params: ["currency"]
    },
    {
      method: "POST",
      path: "/api/v1/bulk/reports",
      description: "Generate multiple reports in batch",
      params: ["registrations[]", "modules[]", "webhook_url"]
    }
  ];

  const modules = [
    { id: "snapshot", name: "Snapshot Base", price: "Free", description: "Basic vehicle data" },
    { id: "build-sheet", name: "Build Sheet", price: "£0.29", description: "Factory specifications" },
    { id: "market-insights", name: "Market Insights", price: "£0.57", description: "Price trends and demand" },
    { id: "maintenance", name: "Maintenance Forecast", price: "£0.57", description: "Predicted costs" },
    { id: "safety", name: "Safety & Risk", price: "£0.27", description: "Safety ratings and theft risk" },
    { id: "provenance", name: "Provenance Check", price: "£4.09", description: "Legal status verification" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 text-primary">
              API Documentation
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Integrate Vehicle Intelligence
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Access our comprehensive vehicle data through a simple, RESTful API. 
              Perfect for dealers, apps, and automotive platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Get API Key
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Try Interactive Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* API Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Key className="h-6 w-6 text-primary" />
                      <CardTitle>Authentication</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      All API requests require authentication using your API key in the Authorization header.
                    </p>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                      Authorization: Bearer your_api_key_here
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Globe className="h-6 w-6 text-primary" />
                      <CardTitle>Base URL</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      All API endpoints are served from our secure base URL.
                    </p>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                      https://api.vehicleintel.com/v1
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Zap className="h-6 w-6 text-primary" />
                      <CardTitle>Rate Limiting</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      API calls are limited to ensure fair usage and optimal performance.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Standard: 100 requests/minute</li>
                      <li>• Premium: 500 requests/minute</li>
                      <li>• Enterprise: Custom limits</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Shield className="h-6 w-6 text-primary" />
                      <CardTitle>Data Formats</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      All responses are returned in JSON format with optional PDF export.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">JSON</Badge>
                      <Badge variant="outline">PDF</Badge>
                      <Badge variant="outline">XML</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="endpoints" className="mt-8">
              <div className="space-y-6">
                {endpoints.map((endpoint, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Badge variant={endpoint.method === "GET" ? "secondary" : "default"}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {endpoint.path}
                        </code>
                      </div>
                      <CardDescription>{endpoint.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-medium">Parameters:</h4>
                        <div className="flex flex-wrap gap-2">
                          {endpoint.params.map((param, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {param}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="modules" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{module.name}</CardTitle>
                        <Badge variant="secondary">{module.price}</Badge>
                      </div>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <code className="text-sm bg-muted px-2 py-1 rounded block">
                        "{module.id}"
                      </code>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="examples" className="mt-8">
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Generate a Basic Report
                    </CardTitle>
                    <CardDescription>
                      Request a vehicle report with snapshot and market insights modules
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
{`curl -X POST https://api.vehicleintel.com/v1/reports/generate \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "registration": "AB12 CDE",
    "modules": ["snapshot", "market-insights"],
    "format": "json"
  }'`}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Batch Processing
                    </CardTitle>
                    <CardDescription>
                      Process multiple vehicles with webhook notification
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
{`curl -X POST https://api.vehicleintel.com/v1/bulk/reports \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "registrations": ["AB12 CDE", "FG34 HIJ", "KL56 MNO"],
    "modules": ["snapshot", "safety", "maintenance"],
    "webhook_url": "https://your-app.com/webhook"
  }'`}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Response Format
                    </CardTitle>
                    <CardDescription>
                      Example response structure for a generated report
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
{`{
  "id": "rpt_1234567890",
  "registration": "AB12 CDE",
  "status": "completed",
  "generated_at": "2024-01-15T10:30:00Z",
  "modules": {
    "snapshot": {
      "tax_status": "valid",
      "mot_expiry": "2024-12-15",
      "recalls": 0
    },
    "market_insights": {
      "price_trend": "stable",
      "demand_score": 7.2,
      "liquidity_index": "high"
    }
  },
  "total_cost": 57,
  "download_url": "https://api.vehicleintel.com/v1/reports/rpt_1234567890/download"
}`}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Book className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Sign up for a free API key and start integrating vehicle intelligence into your application today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Get Free API Key
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ApiDocs;