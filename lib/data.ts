export interface Scenario {
  id: number
  title: string
  category: string
  environment: string
  summary: string
  whatHappened: string
  diagnosisSteps: string[]
  rootCause: string
  fix: string
  lessonsLearned: string
  howToAvoid: string[]
}

export const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Zombie Pods Causing NodeDrain to Hang",
    category: "Cluster Management",
    environment: "K8s v1.23, On-prem bare metal, Systemd cgroups",
    summary: "Node drain stuck indefinitely due to unresponsive terminating pod.",
    whatHappened:
      "A pod with a custom finalizer never completed termination, blocking kubectl drain. Even after the pod was marked for deletion, the API server kept waiting because the finalizer wasn't removed.",
    diagnosisSteps: [
      "Checked kubectl get pods --all-namespaces -o wide to find lingering pods.",
      "Found pod stuck in Terminating state for over 20 minutes.",
      "Used kubectl describe pod <pod> to identify the presence of a custom finalizer.",
      "Investigated controller logs managing the finalizer – the controller had crashed.",
    ],
    rootCause: "Finalizer logic was never executed because its controller was down, leaving the pod undeletable.",
    fix: 'kubectl patch pod <pod-name> -p \'{"metadata":{"finalizers":[]}}\' --type=merge',
    lessonsLearned: "Finalizers should have timeout or fail-safe logic.",
    howToAvoid: [
      "Avoid finalizers unless absolutely necessary.",
      "Add monitoring for stuck Terminating pods.",
      "Implement retry/timeout logic in finalizer controllers.",
    ],
  },
  {
    id: 2,
    title: "API Server Crash Due to Excessive CRD Writes",
    category: "Cluster Management",
    environment: "K8s v1.24, GKE, heavy use of custom controllers",
    summary: "API server crashed due to flooding by a malfunctioning controller creating too many custom resources.",
    whatHappened:
      "A bug in a controller created thousands of Custom Resources (CRs) in a tight reconciliation loop. Etcd was flooded, leading to slow writes, and the API server eventually became non-responsive.",
    diagnosisSteps: [
      "API latency increased, leading to 504 Gateway Timeout errors in kubectl.",
      "Used kubectl get crds | wc -l to list all CRs.",
      "Analyzed controller logs – found infinite reconcile on a specific CR type.",
      "etcd disk I/O was maxed.",
    ],
    rootCause:
      "Bad logic in reconcile loop: create was always called regardless of the state, creating resource floods.",
    fix: "Scaled the controller to 0 replicas.\nManually deleted thousands of stale CRs using batch deletion.",
    lessonsLearned: "Always test reconcile logic in a sandboxed cluster.",
    howToAvoid: ["Implement create/update guards in reconciliation.", "Add Prometheus alert for high CR count."],
  },
]
