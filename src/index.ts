/**
 * Governance Engine - Primary Entry Point
 * 
 * Implements the complete closed-loop pipeline:
 * Input → Normalization → Constraint Enforcement → Dispatch → Telemetry Monitoring
 */
import { LogicGate, IConstraint } from './core/logicGate';
import { Normalizer } from './input/normalizer';
import { Dispatcher } from './output/dispatcher';
import { Telemetry } from './monitoring/telemetry';

const run = async () => {
    console.log("=".repeat(70));
    console.log("Initializing Governance Engine...");
    console.log("=".repeat(70));
    
    // Initialize core components
    const normalizer = new Normalizer();
    const logicGate = new LogicGate();
    const dispatcher = new Dispatcher();
    const telemetry = new Telemetry();
    
    // Define governance constraints
    const constraints: IConstraint[] = [
        {
            id: "latency-constraint",
            validate: (data: any) => data.latency !== undefined && data.latency < 1000
        },
        {
            id: "throughput-constraint",
            validate: (data: any) => data.throughput !== undefined && data.throughput > 0
        },
        {
            id: "data-integrity-constraint",
            validate: (data: any) => data.normalized === true
        }
    ];
    
    // Register constraints with logic gate
    constraints.forEach(constraint => logicGate.registerConstraint(constraint));
    
    console.log("\n[ENGINE] Components initialized");
    console.log(`[ENGINE] Registered ${constraints.length} governance constraints`);
    console.log("[ENGINE] Engine active and awaiting telemetry streams.\n");
    
    // Simulate telemetry pipeline
    const rawTelemetry = {
        latency: 45.2,
        throughput: 850.5,
        systemId: "governance-001",
        timestamp: Date.now()
    };
    
    console.log("-".repeat(70));
    console.log("PIPELINE EXECUTION: Raw Telemetry → Stabilized Output");
    console.log("-".repeat(70));
    
    // Step 1: Log incoming telemetry
    telemetry.log("telemetry.received", rawTelemetry);
    
    // Step 2: Normalize input data
    console.log("\n[PIPELINE] Step 1: Normalization Phase");
    const normalizedData = normalizer.normalize(rawTelemetry);
    telemetry.log("normalization.complete", normalizedData);
    
    // Step 3: Apply constraint enforcement via logic gate
    console.log("\n[PIPELINE] Step 2: Constraint Enforcement");
    const isCompliant = logicGate.enforce(normalizedData);
    telemetry.log("enforcement.result", { compliant: isCompliant });
    
    if (!isCompliant) {
        console.log("[PIPELINE] WARNING: Data failed constraint validation");
        telemetry.log("enforcement.violation", normalizedData);
    } else {
        console.log("[PIPELINE] Data passed all governance constraints");
    }
    
    // Step 4: Dispatch stabilized output
    console.log("\n[PIPELINE] Step 3: Output Dispatch");
    dispatcher.dispatch(normalizedData);
    telemetry.log("dispatch.complete", { dataId: normalizedData.timestamp });
    
    // Step 5: Monitor and calibrate
    console.log("\n[PIPELINE] Step 4: Telemetry Monitoring & Calibration");
    telemetry.log("monitoring.cycle", {
        pipelineStatus: "operational",
        constraintsApplied: constraints.length,
        outputStabilized: true
    });
    
    console.log("\n" + "=".repeat(70));
    console.log("Pipeline Execution Complete");
    console.log("Governance Engine operates in closed-loop equilibrium");
    console.log("=".repeat(70));
};

run().catch(console.error);
